function openCurtain() {
    // Open the curtain
    document.getElementById("curtain").classList.add("open");
    document.querySelector(".reveal-btn").style.display = "none";

    // Play background music after click
    const music = document.getElementById("bg-music");
    music.volume = 0.5; // optional: softer volume
    music.play().then(() => {
      console.log("Music started!");
    }).catch(err => {
      console.log("Error playing music:", err);
    });
  }

const canvas = document.getElementById("confetti");
const confettiCtx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = Array.from({ length: 150 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 2,
  d: Math.random() * 10,
  color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  tilt: Math.random() * 10 - 10
}));

function drawConfetti() {
  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    confettiCtx.beginPath();
    confettiCtx.fillStyle = p.color;
    confettiCtx.ellipse(p.x, p.y, p.r, p.r/2, p.tilt, 0, Math.PI * 2);
    confettiCtx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(p => {
    p.y += Math.cos(p.d) + 1 + p.r/2;
    p.x += Math.sin(0.5);
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}
setInterval(drawConfetti, 30);

class Slider {
    constructor() {
        this.container = document.querySelector('.slider-container');
        this.slider = document.querySelector('.slider');
        this.cursor = document.querySelector('.custom-cursor');
        this.slideWidth = 420; // 400px + 20px margin

        // Configuration des images
        this.images = [
                      "img1.jpg",
                      "img2.jpeg",
                      "img5.jpeg",
                      "img6.jpeg"
                      ];
        

        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.createSlides();
        this.setupEventListeners();
        this.positionSlides();
        this.startAutoplay();
    }

    createSlides() {
    // Create 3x images for smooth infinite scrolling
    const totalSlides = this.images.length * 3;
    for (let i = 0; i < totalSlides; i++) {
        const index = i % this.images.length;
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${this.images[index]}" alt="Slide ${index + 1}">`;
        this.slider.appendChild(slide);
    }
}

    positionSlides() {
        const slides = this.slider.querySelectorAll('.slide');
        const offset = (this.container.offsetWidth - this.slideWidth) / 2;
        const baseTransform = -this.currentIndex * this.slideWidth + offset;

        this.slider.style.transform = `translateX(${baseTransform}px)`;

        // Mettre à jour la slide active
        slides.forEach((slide, index) => {
            const normalizedIndex = this.normalizeIndex(index);
            slide.classList.toggle('active', normalizedIndex === this.currentIndex % this.images.length);
        });
    }

    normalizeIndex(index) {
        return index % this.images.length;
    }

    moveSlides(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const slides = this.slider.querySelectorAll('.slide');
        this.currentIndex += direction;

        // Animer le mouvement
        this.slider.style.transition = 'transform 0.6s ease-in-out';
        this.positionSlides();

        // Réinitialiser la position si nécessaire
        if (this.currentIndex >= this.images.length * 2 || this.currentIndex <= this.images.length - 1) {
            setTimeout(() => {
                this.slider.style.transition = 'none';
                this.currentIndex = this.currentIndex >= this.images.length * 2
                    ? this.currentIndex - this.images.length
                    : this.currentIndex + this.images.length;
                this.positionSlides();
            }, 300);
        }

        setTimeout(() => {
            this.isAnimating = false;
        }, 300);
    }

    setupEventListeners() {
        // Mouvement du curseur
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = `${e.clientX - 25}px`;
            this.cursor.style.top = `${e.clientY - 25}px`;

            const rect = this.container.getBoundingClientRect();
            const isLeft = e.clientX < rect.left + rect.width / 2;

            this.cursor.classList.toggle('left', isLeft);
            this.cursor.classList.toggle('right', !isLeft);
        });

        // Interaction avec le slider
        this.container.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.stopAutoplay();
        });

        this.container.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.startAutoplay();
        });

        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            const isLeft = e.clientX < rect.left + rect.width / 2;

            this.moveSlides(isLeft ? -1 : 1);

            // Animation du curseur
            this.cursor.classList.add('active');
            setTimeout(() => this.cursor.classList.remove('active'), 300);
        });

        // Ajuster au redimensionnement
        window.addEventListener('resize', () => this.positionSlides());
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.moveSlides(1);
        }, 3000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

// Initialiser le slider quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});

document.addEventListener('DOMContentLoaded', function() {
  const fortuneBtn = document.getElementById('fortuneBtn');
  const fortuneText = document.getElementById('fortuneText');
  const fortuneImg = document.getElementById('fortuneCookieImg');
  const fortunes = [
  "You’ll soon feel my lips where you crave them most… 💋",
"Someone is secretly desiring every inch of you tonight… 🔥",
"Your body will be worshipped like it deserves… 😏",
"A night of passion is written in your stars… ✨",
"An irresistible touch will leave you trembling soon… 🥵",
"Every forbidden thought you’ve had… is about to come true… 😈",
"You will be taken slowly, deeply, completely… 💞",
"Tonight, love will leave your heart racing and your skin burning… ❤️‍🔥"
];

// For each fortune cookie container
document.querySelectorAll('.fortune-container').forEach(container => {
  const btn = container.querySelector('.fortune-btn');
  const text = container.querySelector('.fortune-text');
  btn.addEventListener('click', () => {
    // Pick a random fortune
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    text.textContent = fortune;
    btn.disabled = true;
    btn.textContent = "Opened!";
  });
});

  fortuneBtn.addEventListener('click', function() {
    // Animate fade out
    fortuneImg.classList.add('opening');
    setTimeout(() => {
      // Change image source
      fortuneImg.src = 'cookie-open.png';
      // Animate fade in
      fortuneImg.classList.remove('opening');
      // Show fortune message
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      fortuneText.textContent = randomFortune;
    }, 500);
    // Disable button after click
    fortuneBtn.disabled = true;
    fortuneBtn.style.opacity = 0.6;
    fortuneBtn.style.cursor = "default";
  });
});

// Drawing Board Logic
let drawing = false;
let currentColor = 'black';
let board, ctx;

document.addEventListener('DOMContentLoaded', function() {
  board = document.getElementById('board');
  ctx = board.getContext('2d');
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  function setColor(color) {
    currentColor = color;
    document.querySelectorAll('.colors button').forEach(btn => {
      btn.classList.toggle('selected', btn.style.backgroundColor === color);
    });
  }
  window.setColor = setColor; // Make setColor global

  function getPointerPos(e) {
    const rect = board.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  board.addEventListener('mousedown', (e) => {
    drawing = true;
    const pos = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  board.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const pos = getPointerPos(e);
    ctx.strokeStyle = currentColor;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  board.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
  });

  board.addEventListener('mouseleave', () => {
    drawing = false;
    ctx.beginPath();
  });

  // Touch support for mobile
  board.addEventListener('touchstart', (e) => {
    e.preventDefault();
    drawing = true;
    const pos = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });
  board.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!drawing) return;
    const pos = getPointerPos(e);
    ctx.strokeStyle = currentColor;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });
  board.addEventListener('touchend', () => {
    drawing = false;
    ctx.beginPath();
  });

  setColor('black');
});

// Make clearBoard and saveBoard global
function clearBoard() {
  if (ctx && board) {
    ctx.clearRect(0, 0, board.width, board.height);
  }
}

function saveBoard() {
  if (board) {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = board.toDataURL();
    link.click();
  }
}


function openEnvelope() {
      document.querySelector('.envelope-container').classList.toggle('open');
      document.querySelector('.letter').classList.toggle('show');
      // Optional: Add a sound effect when opening the envelope
      const openSound = new Audio('open-envelope.mp3');
      openSound.play();

    }

function submitReview() {
  let review = document.getElementById("loveReview").value.trim();
  let display = document.getElementById("replyDisplay");

  if(review) {
    display.innerHTML = "💖 You said: \"" + review + "\" 💖<br> My heart is melting already! 🥰 take the screenshot and show that to me";
  } else {
    display.innerHTML = "Please don't leave it empty 🥺";
  }
}