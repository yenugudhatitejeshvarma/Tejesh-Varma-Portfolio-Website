class LiquidEffects {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.liquidBg = document.querySelector('.liquid-bg');
        this.ripples = [];
        this.maxRipples = 5;
        
        this.init();
    }
    
    init() {
        this.addMouseEffect();
        this.createRipples();
        this.animate();
    }
    
    addMouseEffect() {
        this.hero.addEventListener('mousemove', (e) => {
            const rect = this.hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            this.liquidBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            
            // Add ripple on click
            if(Math.random() < 0.1) {
                this.addRipple(e.clientX - rect.left, e.clientY - rect.top);
            }
        });
    }
    
    addRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.hero.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }
    
    createRipples() {
        setInterval(() => {
            const x = Math.random() * this.hero.offsetWidth;
            const y = Math.random() * this.hero.offsetHeight;
            this.addRipple(x, y);
        }, 2000);
    }
    
    animate() {
        // Add turbulence animation
        const turbulence = document.querySelector('#liquid feTurbulence');
        let phase = 0;
        
        const animate = () => {
            phase += 0.01;
            turbulence.setAttribute('baseFrequency', `${0.01 + Math.sin(phase) * 0.005},${0.01 + Math.sin(phase) * 0.005}`);
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Initialize liquid effects
document.addEventListener('DOMContentLoaded', () => {
    new LiquidEffects();
}); 