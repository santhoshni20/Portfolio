// --- TYPING ANIMATION FOR HERO ---
const words = ["B.Tech IT Student", "Junior Web Developer", "Tech Enthusiast"];
let i = 0;
let timer;

function typingEffect() {
  const word = words[i].split("");
  const loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typewriter-text').innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deletingEffect() {
  const word = words[i].split("");
  const loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typewriter-text').innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(typingEffect, 500);
      return false;
    }
    timer = setTimeout(loopDeleting, 60);
  };
  loopDeleting();
}

document.addEventListener("DOMContentLoaded", () => {
  typingEffect();
  setupIntersectionObserver();
  initParticles();
  initTiltCards();
});

// --- MOBILE MENU TOGGLE ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('toggle');
  });
});

// --- ACTIVE NAVIGATION LINK ON SCROLL ---
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 120)) {
      current = section.getAttribute('id');
    }
  });

  navLi.forEach(li => {
    li.classList.remove('active');
    if (li.getAttribute('href').includes(current)) {
      li.classList.add('active');
    }
  });
});

// --- SCROLL REVEAL ANIMATIONS (IntersectionObserver) ---
function setupIntersectionObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

// --- SKILLS TAB SYSTEM ---
function switchTab(evt, tabName) {
  // Get all elements with class="skills-grid" and hide them
  const grids = document.querySelectorAll(".skills-grid");
  grids.forEach(grid => grid.classList.remove("active"));

  // Get all elements with class="tab-btn" and remove the class "active"
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => btn.classList.remove("active"));

  // Show the current tab, and add an "active" class to the button that opened the tab
  const activeGrid = document.getElementById(tabName);
  activeGrid.classList.add("active");
  evt.currentTarget.classList.add("active");
}

// --- CONTACT FORM HANDLER ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('btn-submit-form');
    const originalBtnText = submitBtn.innerText;
    
    // Simulate loading state
    submitBtn.innerText = "Sending Message...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
      // Simulate success
      formStatus.innerText = "Thank you! Your message has been sent successfully. Santhoshni will get back to you soon.";
      formStatus.className = "form-status success";
      formStatus.style.display = 'block';
      
      // Clear form
      contactForm.reset();
      
      // Reset button
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
      
      // Fade out status after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
      
    }, 1500);
  });
}

// --- BACKGROUND PARTICLES SIMULATION ---
let canvas;
let ctx;
let particlesArray = [];
let mouse = {
  x: null,
  y: null,
  radius: 120
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  
  update() {
    // Check bounds
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    
    // Check mouse interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 1.5;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 1.5;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 1.5;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 1.5;
      }
    }
    
    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function initParticles() {
  canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let numberOfParticles = (canvas.width * canvas.height) / 12000;
  if (numberOfParticles > 120) numberOfParticles = 120; // cap for performance
  
  particlesArray = [];
  
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    
    // Alternate particle colors: cyan and purple
    let color = i % 2 === 0 ? "rgba(6, 182, 212, 0.2)" : "rgba(168, 85, 247, 0.2)";
    
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
  
  animateParticles();
}

function connectParticles() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 90) {
        opacityValue = 1 - (distance / 90);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.05})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
    
    // Faint connection to mouse
    if (mouse.x && mouse.y) {
      let dxMouse = particlesArray[a].x - mouse.x;
      let dyMouse = particlesArray[a].y - mouse.y;
      let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distanceMouse < mouse.radius) {
        let mouseOpacity = 1 - (distanceMouse / mouse.radius);
        ctx.strokeStyle = `rgba(6, 182, 212, ${mouseOpacity * 0.12})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  
  connectParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }
});

// --- 3D TILT EFFECT FOR CARDS ---
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside element
      const y = e.clientY - rect.top;  // y position inside element
      
      const width = rect.width;
      const height = rect.height;
      
      const midX = width / 2;
      const midY = height / 2;
      
      // Calculate rotation angles (-8 to +8 degrees max)
      const rotateX = ((midY - y) / midY) * 8;
      const rotateY = ((x - midX) / midX) * 8;
      
      // Apply translation transform to card
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Snap card back smoothly
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}
