'use strict';

/* ===== LIVE BANNER: dynamic viewer count + date ===== */
(function initBanner() {
    try {
        var countEl = document.getElementById('viewer-count');
        var dateEl = document.getElementById('live-date');
        if (countEl) countEl.textContent = Math.floor(Math.random() * 13) + 22;
        if (dateEl) {
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            dateEl.textContent = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        }
    } catch (e) { console.warn('[Banner]', e); }
})();

/* ===== SCARCITY: random bottles left ===== */
(function initScarcity() {
    try {
        var el = document.getElementById('bottles-left');
        if (el) el.textContent = Math.floor(Math.random() * 13) + 22;
    } catch (e) { console.warn('[Scarcity]', e); }
})();

/* ===== PURCHASE NOTIFICATIONS ===== */
/* Started ONLY when VTurb calls scrollIntoView() on the pitch section.
   VTurb v4 calls element.scrollIntoView() on .smartplayer-scroll-event
   at the pitch moment — we hijack that call to know the exact timing. */
(function initNotifications() {
    try {
        var started = false;
        var names = ["Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica",
            "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly",
            "Emily", "Donna", "Michelle", "Carol", "Amanda", "Dorothy", "Melissa", "Deborah",
            "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia", "Kathleen", "Amy", "Angela",
            "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen", "Samantha",
            "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather",
            "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria", "Kelly", "Lauren",
            "Christina", "Joan", "Evelyn", "Judith", "Megan", "Andrea", "Cheryl", "Hannah",
            "Jacqueline", "Martha", "Gloria", "Teresa", "Ann", "Sara", "Madison", "Jean", "Kathryn",
            "Janice", "Abigail", "Alice", "Julia", "Judy", "Sophia", "Grace", "Denise", "Amber",
            "Doris", "Marilyn", "Danielle", "Beverly", "Isabella", "Theresa", "Diana", "Natalie",
            "Brittany", "Charlotte", "Marie", "Kayla", "Alexis", "Lori"];
        var cities = ["London", "Manchester", "Birmingham", "Leeds", "Glasgow",
            "Liverpool", "Edinburgh", "Bristol", "Cardiff", "Belfast"];
        var snackbar = document.getElementById('snackbar');

        function showNotif() {
            if (!snackbar) return;
            var name = names[Math.floor(Math.random() * names.length)];
            var city = cities[Math.floor(Math.random() * cities.length)];
            snackbar.innerHTML = '<strong>' + name + '</strong> from ' + city + ' just purchased!';
            snackbar.classList.add('show');
            setTimeout(function () { snackbar.classList.remove('show'); }, 4000);
        }

        function startNotifications() {
            if (started) return;
            started = true;
            setTimeout(showNotif, 3000);
            setInterval(showNotif, 12000);
        }

        /* PRIMARY: intercept scrollIntoView() on the pitch element.
           VTurb calls this method to scroll the page to the pitch section. */
        var pitchEl = document.getElementById('pitch-section');
        if (pitchEl) {
            var nativeScrollIntoView = pitchEl.scrollIntoView.bind(pitchEl);
            pitchEl.scrollIntoView = function (opts) {
                startNotifications();           // trigger notifications on pitch
                nativeScrollIntoView(opts);     // still perform the scroll
            };
        }

        /* FALLBACK: VTurb postMessage (works in some player versions) */
        window.addEventListener('message', function (e) {
            try {
                var d = e.data;
                if (!d) return;
                if (
                    (typeof d === 'string' && (d.indexOf('scrollEvent') !== -1 || d.indexOf('scroll_event') !== -1)) ||
                    (typeof d === 'object' && (d.type === 'scrollEvent' || d.eventType === 'scrollEvent' || d.event === 'scrollEvent'))
                ) {
                    startNotifications();
                }
            } catch (err) { /* ignore cross-origin */ }
        });

    } catch (e) { console.warn('[Notifications]', e); }
})();
