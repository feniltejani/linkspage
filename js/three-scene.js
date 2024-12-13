import * as THREE from 'three';

export class Scene3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.shapes = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.createShapes();
        this.addEventListeners();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        document.getElementById('bg').appendChild(this.renderer.domElement);
        this.camera.position.z = 30;
    }

    createShapes() {
        // Create geometric shapes
        const geometries = [
            new THREE.IcosahedronGeometry(2), // Complex polyhedron
            new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16), // Twisted torus
            new THREE.OctahedronGeometry(1.8), // Diamond-like shape
            new THREE.TetrahedronGeometry(2) // Pyramid
        ];

        // Create materials with holographic effect
        const materials = [
            new THREE.MeshPhongMaterial({
                color: 0x00f3ff,
                shininess: 100,
                specular: 0x00f3ff,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            }),
            new THREE.MeshPhongMaterial({
                color: 0x9d00ff,
                shininess: 100,
                specular: 0x9d00ff,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            })
        ];

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f3ff, 1);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x9d00ff, 1);
        pointLight2.position.set(-10, -10, -10);
        this.scene.add(pointLight2);

        // Create and position shapes
        for (let i = 0; i < 8; i++) {
            const geometry = geometries[i % geometries.length];
            const material = materials[i % materials.length];
            const shape = new THREE.Mesh(geometry, material);

            // Random position
            shape.position.x = (Math.random() - 0.5) * 30;
            shape.position.y = (Math.random() - 0.5) * 30;
            shape.position.z = (Math.random() - 0.5) * 20;

            // Add animation properties
            shape.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };
            shape.floatSpeed = Math.random() * 0.01;
            shape.floatOffset = Math.random() * Math.PI * 2;

            this.shapes.push(shape);
            this.scene.add(shape);
        }
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Update shapes
        this.shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.rotationSpeed.x;
            shape.rotation.y += shape.rotationSpeed.y;
            shape.rotation.z += shape.rotationSpeed.z;

            // Floating motion
            const time = Date.now() * shape.floatSpeed;
            shape.position.y += Math.sin(time + shape.floatOffset) * 0.01;

            // React to mouse
            shape.position.x += (this.mouseX * 0.1 - shape.position.x) * 0.02;
            shape.position.z += (this.mouseY * 0.1 - shape.position.z) * 0.02;

            // Pulse effect
            const scale = 1 + Math.sin(time * 2) * 0.1;
            shape.scale.set(scale, scale, scale);

            // Update material
            if (shape.material.opacity) {
                shape.material.opacity = 0.7 + Math.sin(time) * 0.2;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
} 