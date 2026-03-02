/**
 * Professional Subtle Particles for High-End Vibe
 */

const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Clean, professional theme colors
const colorDot = 'rgba(255, 255, 255, 0.2)';
const colorLine = 'rgba(255, 255, 255, 0.05)';
// Less particles for elegance
const numberOfParticles = 60;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // Very small
        // Very slow drifting 
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = colorDot;
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around smoothly instead of bouncing
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.draw();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

// Draw elegant, faint lines between nearby particles
function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                let opacityValue = 1 - (distance / 150);
                ctx.strokeStyle = `rgba(200, 200, 220, ${opacityValue * 0.15})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }

    connectParticles();

    requestAnimationFrame(animate);
}

// Setup smooth mouse glow
const main = document.body;
const mouseGlow = document.createElement('div');
mouseGlow.classList.add('mouse-glow');
main.appendChild(mouseGlow);

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    mouseGlow.style.opacity = '1';
});

window.addEventListener('mouseout', () => {
    mouseGlow.style.opacity = '0';
});

// Interpolate mouse glow for buttery smooth effect
function updateGlowPosition() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    mouseGlow.style.left = currentX + 'px';
    mouseGlow.style.top = currentY + 'px';
    requestAnimationFrame(updateGlowPosition);
}

// Initialization
resize();
animate();
updateGlowPosition();
