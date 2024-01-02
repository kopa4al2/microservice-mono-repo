import {Mesh} from "three";
import {THREE} from "../RenderEngine";

export default class SkyBox extends Mesh {

    constructor() {
        const skyboxMaterials = [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/textures/sky2.jpg'), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/textures/sky2.jpg'), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/textures/sky2.jpg'), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/textures/sky2.jpg'), side: THREE.BackSide }),
            // new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/textures/sky2.jpg'), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/textures/sky2.jpg'), side: THREE.BackSide }),
        ];

        const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
        skyboxGeometry.translate(0, 437     , 0)
        super(skyboxGeometry, skyboxMaterials);
    }
}