import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export class Scene3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg'),
            alpha: true,
            antialias: true
        });
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 50;
        
        this.isDarkTheme = true;
        this.initThemeToggle();
        
        this.init();
        this.addLights();
        this.addPointCloud();
    }

    init() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.setZ(30);
        
        // Add responsive handling
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    addLights() {
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(pointLight, ambientLight);
    }

    async addPointCloud() {
        const loader = new PCDLoader();
        
        // Add floating spheres while PCD loads
        this.addGeometry();
        
        try {
            const points = await loader.loadAsync('./models/points.pcd');
            points.geometry.center();
            points.geometry.rotateX(Math.PI);
            points.material.size = 0.005;
            points.material.color.setHex(this.isDarkTheme ? 0x6a5acd : 0xa491ff);
            
            // Add GUI controls for point cloud
            const gui = new GUI();
            gui.add(points.material, 'size', 0.001, 0.01);
            gui.addColor(points.material, 'color');
            gui.close(); // Start closed
            
            this.scene.add(points);
            this.pointCloud = points;
        } catch (error) {
            console.log('PCD file loading failed, using spheres only');
        }
    }

    addGeometry() {
        // Add floating spheres as background elements
        for(let i = 0; i < 20; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 24, 24);
            const material = new THREE.MeshStandardMaterial({ 
                color: this.isDarkTheme ? 0x6a5acd : 0xa491ff,
                transparent: true,
                opacity: 0.7
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
            sphere.position.set(x, y, z);
            this.scene.add(sphere);
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Rotate all spheres
        this.scene.children.forEach(child => {
            if(child instanceof THREE.Mesh) {
                child.rotation.x += 0.001;
                child.rotation.y += 0.001;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            this.isDarkTheme = !this.isDarkTheme;
            document.documentElement.setAttribute(
                'data-theme',
                this.isDarkTheme ? 'dark' : 'light'
            );
            
            // Update sphere colors
            this.scene.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    child.material.color.setHex(
                        this.isDarkTheme ? 0x6a5acd : 0xa491ff
                    );
                }
            });
        });
    }
} 