// Initialize AOS, Typed.js and tsParticles
AOS && AOS.init({ duration: 900, once: true });

if (window.tsParticles) {
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        push: { quantity: 4 }
      }
    },
    particles: {
      color: { value: ["#ffffff", "#a0d8ff", "#ffb3b3"] },
      links: { enable: false },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 1.2 },
      number: { density: { enable: true, area: 800 }, value: 35 },
      opacity: { value: 0.75 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } }
    },
    detectRetina: true
  }).catch(() => {});
}

// Typed.js name animation
if (window.Typed) {
  new Typed('.typed-name', {
    strings: ['Santhoshni S', 'Web Developer', 'AI Enthusiast', 'Problem Solver'],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1400,
    loop: true
  });
}

// small entrance tweaks for existing elements
window.addEventListener('load', () => {
  document.querySelectorAll('section').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.style.transition = 'opacity 600ms ease, transform 600ms ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 220 * i);
  });
});
