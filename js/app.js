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
/* Triggered when VTurb scrolls to the pitch section.
   We intercept Element.prototype.scrollIntoView globally so that
   no matter how VTurb queries the DOM, we catch the call. */
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
            console.log('[Notifications] Pitch detected — starting notifications');
            setTimeout(showNotif, 3000);
            setInterval(showNotif, 12000);
        }

        /* ------ PRIMARY: intercept scrollIntoView at prototype level ------
           VTurb calls scrollIntoView() on .smartplayer-scroll-event elements.
           We patch the prototype so ANY call on a matching element triggers us. */
        var nativeScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function () {
            // Check if target is our pitch section or inside it
            if (this.classList && this.classList.contains('smartplayer-scroll-event')) {
                startNotifications();
            }
            // Always call the original
            return nativeScrollIntoView.apply(this, arguments);
        };

        /* ------ FALLBACK: postMessage from VTurb ------ */
        window.addEventListener('message', function (e) {
            try {
                var d = e.data;
                if (!d) return;
                if (
                    (typeof d === 'string' && d.indexOf('scrollEvent') !== -1) ||
                    (typeof d === 'object' && d.type === 'scrollEvent')
                ) {
                    startNotifications();
                }
            } catch (err) { /* ignore */ }
        });

    } catch (e) { console.warn('[Notifications]', e); }
})();
