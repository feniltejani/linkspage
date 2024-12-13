class StarField {
    constructor() {
        this.container = document.getElementById('starContainer');
        this.stars = [];
        this.maxStars = 150;
        this.baseSpeed = 10; // Base animation duration in seconds
        this.init();
    }

    init() {
        // Initial star creation
        for (let i = 0; i < this.maxStars; i++) {
            this.createStar();
        }
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = (Math.random() * 5 + this.baseSpeed);
        star.style.animation = `moveDown ${duration}s linear infinite, 
                              twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;

        this.container.appendChild(star);
        this.stars.push(star);

        // Remove star when it goes off screen
        star.addEventListener('animationiteration', () => {
            if (this.stars.length > this.maxStars) {
                star.remove();
                const index = this.stars.indexOf(star);
                if (index > -1) {
                    this.stars.splice(index, 1);
                }
            }
        });
    }

    updateSpeed(speedFactor) {
        // Adjust animation speed based on input
        const newBaseSpeed = this.baseSpeed / (speedFactor + 0.5);
        
        this.stars.forEach(star => {
            const currentDuration = parseFloat(star.style.animationDuration);
            const randomFactor = Math.random() * 0.5 + 0.75; // Add some variation
            const newDuration = newBaseSpeed * randomFactor;
            
            // Update animation
            star.style.animationDuration = `${newDuration}s`;
        });
    }
}

// Initialize star field
const starField = new StarField();

// Export for use in other modules
export { starField }; 