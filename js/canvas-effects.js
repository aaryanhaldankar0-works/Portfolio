/* ==========================================================================
   AERODYNAMIC AIRFLOW CANVAS (SOFT & SUBTLE)
   Quiet, whisper-thin studio wind tunnel airflow lines
   ========================================================================== */

class AeroStreamCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 40;
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };
    
    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      length: Math.random() * 60 + 30,
      speed: Math.random() * 1.2 + 0.6,
      thickness: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.15 + 0.05,
      angle: 0.04
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
  }

  animate() {
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.particles) {
      p.x += p.speed;
      p.y += Math.sin(p.x * 0.004) * 0.2;

      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.y += (dy / dist) * force * 1.8;
        }
      }

      if (p.x > this.width + 80) {
        p.x = -p.length;
        p.y = Math.random() * this.height;
      }

      // Soft neutral slate gradient (no neon)
      const grad = this.ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
      grad.addColorStop(0, 'rgba(180, 190, 205, 0)');
      grad.addColorStop(1, `rgba(180, 190, 205, ${p.opacity})`);

      this.ctx.beginPath();
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = p.thickness;
      this.ctx.lineCap = 'round';
      this.ctx.moveTo(p.x - p.length, p.y);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AeroStreamCanvas('bg-canvas');
});
