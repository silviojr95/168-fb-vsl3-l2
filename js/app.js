'use strict';

/* ===== LIVE BANNER: dynamic viewer count + date ===== */
(function initBanner() {
    try {
        const countEl = document.getElementById('viewer-count');
        const dateEl = document.getElementById('live-date');
        if (countEl) countEl.textContent = Math.floor(Math.random() * 13) + 22; // 22–34
        if (dateEl) {
            const d = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            dateEl.textContent = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        }
    } catch (e) { console.warn('[Banner]', e); }
})();

/* ===== SCARCITY: random bottles left ===== */
(function initScarcity() {
    try {
        const el = document.getElementById('bottles-left');
        if (el) el.textContent = Math.floor(Math.random() * 13) + 22; // 22–34
    } catch (e) { console.warn('[Scarcity]', e); }
})();

/* ===== NOTIFICATIONS + PITCH REVEAL — triggered by VTurb pitch message ===== */
(function initPitchListeners() {
    try {
        /* --- Notifications --- */
        var notifStarted = false;
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
            if (notifStarted) return;
            notifStarted = true;
            setTimeout(showNotif, 3000);
            setInterval(showNotif, 12000);
        }

        /* --- VTurb pitch event listener (primary trigger) ---
           VTurb v4 sends a postMessage when it scrolls to the pitch section.
           We use this same event to start notifications. */
        window.addEventListener('message', function (e) {
            try {
                var d = e.data;
                if (!d) return;
                // VTurb scroll event formats
                var isScrollEvent =
                    (typeof d === 'string' && (d.indexOf('scrollEvent') !== -1 || d.indexOf('smartplayer') !== -1)) ||
                    (typeof d === 'object' && (d.type === 'scrollEvent' || d.eventType === 'scrollEvent'));
                if (isScrollEvent) {
                    startNotifications();
                }
            } catch (err) { /* ignore cross-origin errors */ }
        });

        /* --- Fallback: also observe VTurb attribute changes on pitch element ---
           VTurb may toggle classes without postMessage in some configs */
        var pitchEl = document.getElementById('pitch-section');
        if (pitchEl) {
            var attrObserver = new MutationObserver(function () { startNotifications(); });
            attrObserver.observe(pitchEl, { attributes: true, attributeFilter: ['class', 'style'] });
        }

        /* --- Hard fallback: if VTurb never fires, start after 5 min ---
           (prevents notifications never showing if VTurb event format changes) */
        setTimeout(startNotifications, 300000);

    } catch (e) { console.warn('[PitchListeners]', e); }
})();
