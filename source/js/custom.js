/* -----------------------------------------------------------
   SxLight Custom Creative Interactions
----------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  console.log("SxLight Creative Mode Activated ✨");

  // 1. Interactive Title Effect
  // Changes the tab title when the user leaves the page
  const originalTitle = document.title;
  window.addEventListener("blur", () => {
    document.title = "👋 Come back to SxLight!";
  });
  window.addEventListener("focus", () => {
    document.title = originalTitle;
  });

  // 2. Parallax Effect for Banner (Subtle)
  const banner = document.getElementById("banner");
  if (banner) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      banner.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
  }

  // 3. Simple Click Burst Effect (Optional fun interaction)
  document.addEventListener("click", function (e) {
    createBurst(e.clientX, e.clientY);
  });

  function createBurst(x, y) {
    const burst = document.createElement("div");
    burst.className = "click-burst";
    burst.style.left = x + "px";
    burst.style.top = y + "px";
    document.body.appendChild(burst);

    // Animation handled by CSS (needs to be added if we want this)
    // For now, let's keep it simple to avoid clutter
    setTimeout(() => {
      burst.remove();
    }, 500);
  }
});
