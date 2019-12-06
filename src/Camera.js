import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Camera {
    constructor({renderer, scene}) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 500;
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );  
        
        let onResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
          
        window.addEventListener( 'resize', onResize, false );         
    }

    get position() {return this.camera.position;}
    update() {
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
}

export default Camera