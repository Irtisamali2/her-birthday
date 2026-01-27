// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeHearts();
    setCurrentDate();
    initializeParticles();
});

// ==================== Floating Hearts ====================
function initializeHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '❤️', '🌹'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

        heartsContainer.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 13000);
    }

    // Create hearts periodically
    setInterval(createHeart, 800);

    // Initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }
}

// ==================== Background Particles ====================
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsla(${Math.random() * 60 + 300}, 100%, 70%, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`;
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;

        particlesContainer.appendChild(particle);
    }

    // Add twinkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);
}

// ==================== Date Display ====================
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// ==================== Card Flip Interaction ====================
function flipCard(card) {
    card.classList.toggle('flipped');

    // Add a little celebration effect
    if (card.classList.contains('flipped')) {
        createMiniCelebration(card);
    }
}

function createMiniCelebration(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.fontSize = '20px';

        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(sparkle);

        let opacity = 1;
        let x = centerX;
        let y = centerY;

        const animate = () => {
            opacity -= 0.02;
            x += vx * 0.016;
            y += vy * 0.016;

            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };

        requestAnimationFrame(animate);
    }
}

// ==================== Celebration Button ====================
function celebrate() {
    // Trigger confetti
    launchConfetti();

    // Show a sweet message
    showSweetMessage();

    // Add celebration sound effect (visual feedback)
    const button = document.querySelector('.celebration-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

// ==================== Confetti Animation ====================
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 150;
    const colors = [
        'hsl(330, 100%, 50%)',
        'hsl(280, 80%, 60%)',
        'hsl(240, 80%, 60%)',
        'hsl(45, 100%, 60%)',
        'hsl(170, 80%, 50%)',
        'hsl(0, 100%, 60%)'
    ];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.opacity = 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height * 0.75) {
                this.opacity -= 0.01;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            confettiPieces.push(new Confetti());
        }, i * 10);
    }

    // Animation loop
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((piece, index) => {
            piece.update();
            piece.draw();

            // Remove pieces that are fully faded
            if (piece.opacity <= 0 || piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animateConfetti();
}

// ==================== Sweet Message Modal ====================
function showSweetMessage() {
    const existingModal = document.querySelector('.sweet-modal');
    if (existingModal) return;

    const modal = document.createElement('div');
    modal.className = 'sweet-modal';
    modal.innerHTML = `
        <div class="sweet-modal-content">
            <h2>🎉 Happy Birthday Fatima! 🎉</h2>
            <p>Just 18 days ago, on January 10th, a random Instagram scroll brought us together. Now I can't imagine my life without you. Your kindness, your caring nature, and your beautiful soul have shown me what true love means.</p>
            <p>I feel blessed beyond measure to have you in my life. May Allah bless you with endless happiness, success, and all the joy you deserve. Here's to our forever story, InshAllah! 💖</p>
            <p><strong>I love you with all my heart!</strong></p>
            <button onclick="closeSweetMessage()" class="close-modal-btn">Thank You! 💕</button>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .sweet-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
            padding: 1rem;
        }
        
        .sweet-modal-content {
            background: linear-gradient(135deg, rgba(255, 20, 147, 0.3), rgba(147, 51, 234, 0.3));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            padding: 2.5rem;
            max-width: 500px;
            text-align: center;
            animation: slideUp 0.5s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .sweet-modal-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.8rem, 5vw, 2.5rem);
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, hsl(45, 100%, 60%), hsl(35, 100%, 50%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .sweet-modal-content p {
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 1rem;
            color: hsl(0, 0%, 95%);
        }
        
        .close-modal-btn {
            margin-top: 1.5rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, hsl(330, 100%, 50%), hsl(280, 80%, 60%));
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.5);
        }
        
        .close-modal-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(255, 20, 147, 0.7);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @media (max-width: 480px) {
            .sweet-modal-content {
                padding: 2rem 1.5rem;
            }
            
            .sweet-modal-content p {
                font-size: 1rem;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);
}

function closeSweetMessage() {
    const modal = document.querySelector('.sweet-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

// Add fade out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// ==================== Responsive Canvas Resize ====================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== Easter Egg: Blow out candles ====================
let clickCount = 0;
document.addEventListener('click', (e) => {
    if (e.target.closest('.candles')) {
        clickCount++;
        if (clickCount === 3) {
            blowOutCandles();
            clickCount = 0;
        }
    }
});

function blowOutCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            flame.style.transition = 'opacity 0.5s ease';
        }, index * 200);
    });

    setTimeout(() => {
        launchConfetti();
        flames.forEach(flame => {
            flame.style.opacity = '1';
            flame.style.animation = 'flicker 0.3s ease-in-out infinite alternate';
        });
    }, 1500);
}
