// Mouse-following Sparkles
const sparkleContainer = document.getElementById("sparkles");
const sparkleColors = ["#ff66cc", "#ffffff", "#ffb6c1", "#ffe6f1", "#ff99ff"];
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  sparkle.style.width = sparkle.style.height = Math.random() * 4 + 2 + "px";
  sparkle.style.background = `radial-gradient(circle, ${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]}, transparent)`;
  sparkleContainer.appendChild(sparkle);

  let angle = Math.random() * Math.PI * 2;
  let radius = Math.random() * 1.5;

  function animate() {
    const rect = sparkle.getBoundingClientRect();
    let dx = mouse.x - rect.left;
    let dy = mouse.y - rect.top;
    sparkle.style.left = rect.left + dx * 0.002 + Math.cos(angle) * radius + "px";
    sparkle.style.top = rect.top + dy * 0.002 + Math.sin(angle) * radius + "px";
    angle += 0.02;
    requestAnimationFrame(animate);
  }
  animate();

  // Remove sparkle after 12s
  setTimeout(() => sparkle.remove(), 12000);
}

setInterval(createSparkle, 120);
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// GSAP entrance animations
gsap.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power4.out" });
gsap.from(".hero h1", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
gsap.from(".hero p", { y: 30, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".hero a", { scale: 0.8, opacity: 0, duration: 1, delay: 0.9 });

// Scroll-triggered section fades
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: { trigger: section, start: "top 90%" },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});

// Floating orbs subtle motion
document.querySelectorAll(".orb").forEach((orb) => {
  gsap.to(orb, {
    x: () => gsap.utils.random(-50, 50),
    y: () => gsap.utils.random(-50, 50),
    duration: () => gsap.utils.random(6, 12),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});
