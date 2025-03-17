class ThreeEffects {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        
        this.particles = [];
        this.raindrops = [];
        this.tornado = null;
        this.sphere = null;
        this.lightning = null;
        
        this.init();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.querySelector('.hero-3d-container').appendChild(this.renderer.domElement);
        
        // Camera position
        this.camera.position.z = 30;
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add point light
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
        
        this.createSphere();
        this.createTornado();
        this.createRain();
        this.createLightning();
        
        this.animate();
        this.handleResize();
    }
    
    createSphere() {
        // Create animated sphere
        const geometry = new THREE.IcosahedronGeometry(5, 3);
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying float vDisplacement;
                uniform float time;
                
                void main() {
                    vUv = uv;
                    vNormal = normal;
                    
                    // Create wave effect
                    float displacement = sin(position.x * 2.0 + time) * 
                                       sin(position.y * 2.0 + time) * 
                                       sin(position.z * 2.0 + time) * 0.25;
                    
                    vDisplacement = displacement;
                    vec3 newPosition = position + normal * displacement;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying float vDisplacement;
                uniform float time;
                
                void main() {
                    vec3 color1 = vec3(0.1, 0.3, 0.9);
                    vec3 color2 = vec3(0.9, 0.1, 0.3);
                    vec3 color = mix(color1, color2, vDisplacement + 0.5);
                    
                    float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
                    gl_FragColor = vec4(color * intensity, 1.0);
                }
            `,
            uniforms: {
                time: { value: 0 }
            },
            wireframe: true
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
    }
    
    createTornado() {
        const tornadoGeometry = new THREE.BufferGeometry();
        const particles = 5000;
        const positions = new Float32Array(particles * 3);
        
        for(let i = 0; i < particles * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 20;
            const radius = Math.abs(height) * 0.2 + 0.5;
            
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = height;
            positions[i + 2] = Math.sin(angle) * radius;
        }
        
        tornadoGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const tornadoMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x88ccff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.tornado = new THREE.Points(tornadoGeometry, tornadoMaterial);
        this.scene.add(this.tornado);
    }
    
    createRain() {
        const rainGeometry = new THREE.BufferGeometry();
        const rainCount = 15000;
        const positions = new Float32Array(rainCount * 3);
        
        for(let i = 0; i < rainCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = Math.random() * 50;
            positions[i + 2] = (Math.random() - 0.5) * 100;
        }
        
        rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const rainMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x99ccff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.rain = new THREE.Points(rainGeometry, rainMaterial);
        this.scene.add(this.rain);
    }
    
    createLightning() {
        const lightningMaterial = new THREE.LineBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0
        });
        
        const points = [];
        points.push(new THREE.Vector3(0, 15, 0));
        
        for(let i = 0; i < 10; i++) {
            const lastPoint = points[points.length - 1];
            points.push(new THREE.Vector3(
                lastPoint.x + (Math.random() - 0.5) * 4,
                lastPoint.y - 3,
                lastPoint.z + (Math.random() - 0.5) * 4
            ));
        }
        
        const lightningGeometry = new THREE.BufferGeometry().setFromPoints(points);
        this.lightning = new THREE.Line(lightningGeometry, lightningMaterial);
        this.scene.add(this.lightning);
    }
    
    triggerLightning() {
        if(!this.lightning) return;
        
        this.lightning.material.opacity = 1;
        
        // Multiple flashes
        let flashCount = 0;
        const flash = () => {
            setTimeout(() => {
                this.lightning.material.opacity = Math.random() * 0.5 + 0.5;
                flashCount++;
                
                if(flashCount < 3) {
                    flash();
                } else {
                    setTimeout(() => {
                        this.lightning.material.opacity = 0;
                    }, 50);
                }
            }, Math.random() * 50 + 50);
        };
        
        flash();
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Animate sphere
        if(this.sphere) {
            this.sphere.rotation.x += 0.001;
            this.sphere.rotation.y += 0.002;
            this.sphere.material.uniforms.time.value += 0.05;
        }
        
        // Animate tornado
        if(this.tornado) {
            this.tornado.rotation.y += 0.02;
            const positions = this.tornado.geometry.attributes.position.array;
            for(let i = 0; i < positions.length; i += 3) {
                const angle = Math.atan2(positions[i], positions[i + 2]) + 0.02;
                const radius = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2);
                positions[i] = Math.cos(angle) * radius;
                positions[i + 2] = Math.sin(angle) * radius;
            }
            this.tornado.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animate rain
        if(this.rain) {
            const positions = this.rain.geometry.attributes.position.array;
            for(let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.2;
                if(positions[i] < -25) {
                    positions[i] = 25;
                }
            }
            this.rain.geometry.attributes.position.needsUpdate = true;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    const effects = new ThreeEffects();
    
    // Trigger lightning occasionally
    setInterval(() => {
        if(Math.random() < 0.1) {
            effects.triggerLightning();
        }
    }, 5000);
}); 