export class DynamicBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'background';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.initGradients();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    initGradients() {
        this.gradients = [
            {
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 300 + 200,
                hue: Math.random() * 360,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                }
            },
            {
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 300 + 200,
                hue: Math.random() * 360,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                }
            }
        ];
    }

    drawGradient(gradient) {
        const radialGradient = this.ctx.createRadialGradient(
            gradient.x, gradient.y, 0,
            gradient.x, gradient.y, gradient.size
        );

        radialGradient.addColorStop(0, `hsla(${gradient.hue}, 100%, 50%, 0.2)`);
        radialGradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = radialGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    update() {
        this.gradients.forEach(gradient => {
            gradient.x += gradient.velocity.x;
            gradient.y += gradient.velocity.y;
            gradient.hue += 0.1;

            // Bounce off edges
            if (gradient.x < 0 || gradient.x > this.width) gradient.velocity.x *= -1;
            if (gradient.y < 0 || gradient.y > this.height) gradient.velocity.y *= -1;
        });
    }

    draw() {
        this.ctx.fillStyle = 'rgba(6, 12, 33, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.gradients.forEach(gradient => {
            this.drawGradient(gradient);
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}