'use strict';

function atomiShowItems({ items }) {
  try {
    items.forEach((item) => {
      const hiddenItem = [...document.querySelectorAll(`#${item}`), ...document.querySelectorAll(`.${item}`)];
      if (hiddenItem?.length > 0) {
        hiddenItem.forEach(item => item.classList.remove("atomicat-delay"));
      }
    })
  } catch (error) {
    console.warn('[AtomiShow]', error);
  }
}

function runDelayedFunctions(data) {
  try {
    document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
    if (data?.setDisplayed) {
      try { localStorage.setItem(data.setDisplayed, true); } catch (e) { }
    }
  } catch (error) {
    console.warn('[DelayedFunctions]', error);
  }
}

function atomiGetVturbSrc() {
  try {
    var src = "";

    try {
      var pageUrl = new URL(window.location.href);
      src = pageUrl.searchParams.get("src") || "";
      if (src) return location.search != "" ? "&src=" + src : "?src=" + src;
    } catch (e) { }

    try {
      var links = document.querySelectorAll('a[href*="src="]');
      for (var i = 0; i < links.length; i++) {
        try {
          var u = new URL(links[i].href);
          var s = u.searchParams.get("src");
          if (s) return location.search != "" ? "&src=" + s : "?src=" + s;
        } catch (e2) { }
      }
    } catch (e1) { }

    return "";
  } catch (error) {
    console.warn('[VturbSrc]', error);
  }
}

(function () {
  try {
    const clickeventList = [{ "compKey": "a299adf", "misc": { "type": "button" } }, { "compKey": "4a34d58", "misc": { "type": "button" } }, { "compKey": "47fc5eb", "misc": { "type": "button" } }];


    clickeventList.forEach((comp, index) => {
      const compKey = comp?.compKey;
      const eleType = comp?.misc?.type;







    });

  } catch (error) {
    return error;
  }
})();
(function () {
  function atomiShowNotification(e, t) {
    try {
      var n = document.getElementById("atomicat-snackbar");
      document.getElementById("atomicat-notification-name").innerText = e;

      n.classList.add("a-sn");
      setTimeout(function () {
        n.classList.remove("a-sn");
      }, 4e3);
    } catch (error) {
      console.log(error);
    }
  }
  function randomIntFromInterval(e, t) {
    try {
      return Math.floor(Math.random() * (t - e + 1) + e);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const names = ["Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Dorothy", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia", "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen", "Samantha", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather", "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria", "Kelly", "Lauren", "Christina", "Joan", "Evelyn", "Judith", "Megan", "Andrea", "Cheryl", "Hannah", "Jacqueline", "Martha", "Gloria", "Teresa", "Ann", "Sara", "Madison", "Jean", "Kathryn", "Janice", "Abigail", "Alice", "Julia", "Judy", "Sophia", "Grace", "Denise", "Amber", "Doris", "Marilyn", "Danielle", "Beverly", "Isabella", "Theresa", "Diana", "Natalie", "Brittany", "Charlotte", "Marie", "Kayla", "Alexis", "Lori"]

    const g = randomIntFromInterval(0, names.length - 1);
    atomiShowNotification(names[g], "[atomicat-notification-msg]");
    setInterval(() => {
      let t = randomIntFromInterval(0, names.length - 1);
      atomiShowNotification(names[t], "[atomicat-notification-msg]");
    }, 8e3);
  } catch (error) {
    console.log(error);
  }
})();