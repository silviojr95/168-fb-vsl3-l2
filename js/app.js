'use strict';

/* ===== LIVE BANNER: dynamic viewer count + date ===== */
(function initBanner() {
    try {
        const countEl = document.getElementById('viewer-count');
        const dateEl = document.getElementById('live-date');
        if (countEl) countEl.textContent = Math.floor(Math.random() * 13) + 22; // 22-34
        if (dateEl) {
            const d = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            dateEl.textContent = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        }
    } catch (e) { console.warn('[Banner]', e); }
})();

/* ===== SCARCITY: random bottles left ===== */
(function initScarcity() {
    try {
        const el = document.getElementById('bottles-left');
        if (el) el.textContent = Math.floor(Math.random() * 13) + 22; // 22-34
    } catch (e) { console.warn('[Scarcity]', e); }
})();

/* ===== PURCHASE NOTIFICATIONS ===== */
(function initNotifications() {
    try {
        const names = ["Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Dorothy", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia", "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen", "Samantha", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather", "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria", "Kelly", "Lauren", "Christina", "Joan", "Evelyn", "Judith", "Megan", "Andrea", "Cheryl", "Hannah", "Jacqueline", "Martha", "Gloria", "Teresa", "Ann", "Sara", "Madison", "Jean", "Kathryn", "Janice", "Abigail", "Alice", "Julia", "Judy", "Sophia", "Grace", "Denise", "Amber", "Doris", "Marilyn", "Danielle", "Beverly", "Isabella", "Theresa", "Diana", "Natalie", "Brittany", "Charlotte", "Marie", "Kayla", "Alexis", "Lori"];
        const cities = ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Edinburgh", "Bristol", "Cardiff", "Belfast"];
        const snackbar = document.getElementById('snackbar');
        if (!snackbar) return;

        function show() {
            const name = names[Math.floor(Math.random() * names.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            snackbar.innerHTML = '<strong>' + name + '</strong> from ' + city + ' just purchased!';
            snackbar.classList.add('show');
            setTimeout(function () { snackbar.classList.remove('show'); }, 4000);
        }

        setTimeout(show, 5000);
        setInterval(show, 12000);
    } catch (e) { console.warn('[Notifications]', e); }
})();

/* ===== VTURB PITCH REVEAL ===== */
/* VTurb dispatches "smartplayer-scroll-event" when the pitch moment hits.
   We listen globally and reveal all .pitch-hidden elements. */
(function initPitchReveal() {
    try {
        function reveal() {
            document.querySelectorAll('.pitch-hidden').forEach(function (el) {
                el.classList.add('revealed');
            });
        }

        // Listen for VTurb's custom event
        window.addEventListener('message', function (e) {
            try {
                if (typeof e.data === 'string' && e.data.indexOf('smartplayer') !== -1) {
                    reveal();
                }
                if (typeof e.data === 'object' && e.data.type === 'scrollEvent') {
                    reveal();
                }
            } catch (err) { /* ignore */ }
        });

        // Also detect via class-based observer (VTurb adds/removes classes)
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                if (m.target.classList && m.target.classList.contains('smartplayer-scroll-event')) {
                    reveal();
                }
            });
        });
        var scrollTargets = document.querySelectorAll('.smartplayer-scroll-event');
        scrollTargets.forEach(function (t) {
            observer.observe(t, { attributes: true, attributeFilter: ['class'] });
        });

        // Fallback: reveal after 5 minutes regardless (in case VTurb event fails)
        setTimeout(reveal, 300000);
    } catch (e) { console.warn('[PitchReveal]', e); }
})();
