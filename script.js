// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // Typed.js effect setup
  const typed = new Typed('#typed', {
    strings: [
      "Welcome to Aditya's Portfolio",
      "Passionate Developer & Learner",
      "MCA Student | Python Enthusiast",
      "Explore My Resume Below"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });

  // Personal quotes to rotate
  const quotes = [
    '"Dream big, work hard, stay humble."',
    '"Code is poetry, and I am the poet."',
    '"Every bug fixed is a step forward."',
    '"Learning never exhausts the mind."'
  ];
  const quoteElement = document.getElementById('quote');
  let quoteIndex = 0;

  function rotateQuotes() {
    quoteElement.style.opacity = 0;
    setTimeout(() => {
      quoteElement.textContent = quotes[quoteIndex];
      quoteElement.style.opacity = 1;
      quoteIndex = (quoteIndex + 1) % quotes.length;
    }, 600);
  }
  rotateQuotes();
  setInterval(rotateQuotes, 6000);

  // Animate skill bars when they enter viewport
  const skillLevels = document.querySelectorAll('.skill-level');

  function animateSkills() {
    skillLevels.forEach(level => {
      const rect = level.getBoundingClientRect();
      if(rect.top < window.innerHeight && !level.classList.contains('animated')) {
        level.style.width = level.getAttribute('data-level') + '%';
        level.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills(); // Run once on load

  // Dark mode toggle
  const toggle = document.getElementById('darkModeToggle');

  // Apply saved mode or system preference
  function applyDarkMode(saved) {
    if(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    } else {
      document.body.classList.remove('dark-mode');
      toggle.checked = false;
    }
  }
  // Load saved preference
  const savedMode = localStorage.getItem('darkMode');
  applyDarkMode(savedMode);

  // Toggle event
  toggle.addEventListener('change', () => {
    if(toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'light');
    }
  });

  // Parallax effect on background
  document.body.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // max 15px shift
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.body.style.setProperty('--mouse-x', `${x}px`);
    document.body.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Simple visitor counter using CountAPI (free, no signup)
fetch('https://api.countapi.xyz/hit/adityasharma.github.io/resume')
  .then(response => response.json())
  .then(data => {
    document.getElementById('count').textContent = data.value;
  })
  .catch(() => {
    document.getElementById('count').textContent = 'N/A';
  });
