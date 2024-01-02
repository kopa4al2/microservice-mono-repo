import {
    Bone,
    Color,
    Material,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Object3D,
    Object3DEventMap, Skeleton,
    SkeletonHelper, SkinnedMesh
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MeshStandardNodeMaterial from "three/examples/jsm/nodes/materials/MeshStandardNodeMaterial";
import ColorUtils from "../utils/ColorUtils";


export enum AssetNames {
    BASE_HEX = './assets/models/tiles/hex-tile2.glb',
    WATER_HEX = './assets/models/tiles/water-hex.glb',
    GRASS1 = './assets/models/tiles/grass-hex.glb',
    GRASS2 = './assets/models/tiles/grass-hex-rough.glb',
    GRASS3 = './assets/models/tiles/grass-hex-rough2.glb',
    MOUNTAIN1 = './assets/models/tiles/mountain1.glb',
    MOUNTAIN2 = './assets/models/tiles/mountain2.glb',
    DRAGON = './assets/models/manticore.glb',
    HOUSE2 = './assets/models/buildings/house2.glb',
    HOUSE1 = './assets/models/buildings/old-house-v1.glb',
    ARC_DEVA = './assets/models/entity/arcdeva.glb',
    BOAT = './assets/models/entity/boat.glb',
}

export default class AssetManager {

    private static readonly LOADER = new GLTFLoader();
    static readonly LOADED_ASSETS: { [index: string]: Object3D } = {}

    static readonly TILES_ASSETS = [
        AssetNames.BASE_HEX, AssetNames.GRASS1, AssetNames.GRASS2, AssetNames.GRASS3, AssetNames.MOUNTAIN1, AssetNames.MOUNTAIN2,
        AssetNames.WATER_HEX
    ]

    static readonly ENTITY_ASSETS = [
        AssetNames.DRAGON
    ]

    public static getAsset(name: AssetNames, clone?: boolean): Object3D {
        return clone ? this.deepClone(this.LOADED_ASSETS[name]) : this.LOADED_ASSETS[name];
    }

    public static getOrLoadAsset(name: AssetNames, deepClone: boolean = true): Promise<Object3D> {
        return new Promise(async resolve => {
            if (!this.LOADED_ASSETS[name]) {
                const result = await this.LOADER.loadAsync(name)
                AssetManager.LOADED_ASSETS[name] = result.scene;
            }

            resolve(deepClone ? this.deepClone(this.LOADED_ASSETS[name]) : this.LOADED_ASSETS[name]);
        })
    }

    public static getTile(tile: AssetNames, deepClone: boolean = true) {
        const loadedAsset = this.LOADED_ASSETS[tile];

        if (deepClone) {
            return this.deepCloneTile(loadedAsset);
        }

        return loadedAsset;
    }

    public static getGrassTile(deepClone: boolean = true): Object3D {
        const randomGrass = getRandomValueOfArray([AssetNames.GRASS1, AssetNames.GRASS2, AssetNames.GRASS3]);
        const loadedAsset = this.LOADED_ASSETS[AssetNames.GRASS2];

        if (deepClone) {
            return this.deepCloneTile(loadedAsset);
        }

        return loadedAsset;
    }

    public static getMountainTile(deepClone: boolean = true): Object3D {
        const randomGrass = getRandomValueOfArray([AssetNames.MOUNTAIN1, AssetNames.MOUNTAIN2]);
        const loadedAsset = this.LOADED_ASSETS[randomGrass];

        if (deepClone) {
            return this.deepCloneTile(loadedAsset);
        }

        return loadedAsset;
    }

    public static loadTileAssets(): Promise<void> {
        const promises = AssetManager.TILES_ASSETS
            .map(asset => AssetManager.LOADER.loadAsync(asset));

        return new Promise(resolve => {
            Promise.all(promises)
                .then(promiseResults => {
                    promiseResults.forEach((result, index) => {
                        const asset = AssetManager.TILES_ASSETS[index];
                        AssetManager.LOADED_ASSETS[asset] = result.scene;
                    });

                    resolve();
                })
        })
    }

    /**
     * God bless this fellow: https://gist.github.com/cdata/f2d7a6ccdec071839bc1954c32595e87.
     * TODO: This could be reworked, if i need to import animations from the objects as well.
     * @param asset the asset to clone.
     * @private deep clone a gltf imported object.
     */
    private static deepClone(asset: Object3D) {
        const cloneGltf = (gltf: Object3D) => {
            const clone = {
                animations: gltf.animations,
                scene: gltf.clone(true)
            };

            const skinnedMeshes: { [name: string]: SkinnedMesh } = {};

            gltf.traverse(node => {
                if (node instanceof SkinnedMesh) {
                    skinnedMeshes[node.name] = node;
                }
            });

            const cloneBones: { [name: string]: Bone } = {};
            const cloneSkinnedMeshes: { [name: string]: SkinnedMesh } = {};

            clone.scene.traverse(node => {
                if (node instanceof Bone) {
                    cloneBones[node.name] = node;
                }

                if (node instanceof SkinnedMesh) {
                    cloneSkinnedMeshes[node.name] = node;
                }
            });

            for (let name in skinnedMeshes) {
                const skinnedMesh = skinnedMeshes[name];
                const skeleton = skinnedMesh.skeleton;
                const cloneSkinnedMesh = cloneSkinnedMeshes[name];

                const orderedCloneBones = [];

                for (let i = 0; i < skeleton.bones.length; ++i) {
                    const cloneBone = cloneBones[skeleton.bones[i].name];
                    orderedCloneBones.push(cloneBone);
                }

                cloneSkinnedMesh.bind(
                    new Skeleton(orderedCloneBones, skeleton.boneInverses),
                    cloneSkinnedMesh.matrixWorld);
            }

            return clone;
        }

        return cloneGltf(asset).scene;
    }

    /**
     * @param loadedAsset the asset to clone.
     * @private the cloned asset with cloned geometry and mesh
     */
    private static deepCloneTile(loadedAsset: Object3D) {
        const tileMesh = loadedAsset.children[0].children[1] as Mesh;

        const clone = loadedAsset.clone();
        const clonedGeometry = tileMesh.geometry.clone();
        const clonedMaterial = (tileMesh.material as Material).clone();

        const clonedMesh = new Mesh(clonedGeometry, clonedMaterial);
        clone.children[0].children = [clonedMesh];

        return clone;
    }
}

function getKeyByValue(myEnum: any, enumValue: number | string): string {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : '';
}

function getRandomValueOfArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
