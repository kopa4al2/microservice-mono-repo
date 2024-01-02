// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from '@tweenjs/tween.js'

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';



// Boiler Plate Starter for ThreeJS
class RenderEngine {
    // #region MAIN
    scene: THREE.Scene            = null;
    camera: THREE.Camera          = null;
    clock 			          = null;
    renderer: THREE.Renderer      = null;
    outlinePass: OutlinePass      = null;
    orbit			          = null;
    render_bind		              = this.render.bind( this );
    onRender: func		          = null;
    deltaTime	          = 0;
    elapsedTime	          = 0;
    context: {}                   = {};

    constructor( config={} ){ // { webgl2:true, grid:true, container:null }
        this.context.animations = [];
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // MAIN
        this.scene				= new THREE.Scene();
        this.camera				= new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 2000 );
        this.camera.position.set( 0, 10, 20 );

        this.clock 				= new THREE.Clock();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // LIGHTING
        let lightMain = new THREE.DirectionalLight( 0xffffff, 0.8 );
        lightMain.position.set( 4, 10, 4 );

        this.scene.add( lightMain );
        this.scene.add( new THREE.AmbientLight( 0x404040 ) );

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // RENDERER
        let options = { antialias:true, alpha:true };

        // THREE.JS can't handle loading into WebGL2 on its own
        // Need to create canvas & get the proper context, pass those 2 into 3js
        if( config.webgl2 ){
            let canvas      = document.createElement( "canvas" );
            options.canvas  = canvas;
            options.context = canvas.getContext( "webgl2" );
            canvas.oncontextmenu = function(e) { e.preventDefault(); }
        }

        this.renderer = new THREE.WebGLRenderer( options );
        this.renderer.alpha = true;
        this.renderer.autoClear = false;
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setClearColor( 0x000000, 1 );


        //---------------------------------
        // where to add the cnavas object, in a container or in the body.
        if( config.container )  config.container.appendChild( this.renderer.domElement );
        else                    document.body.appendChild( this.renderer.domElement );

        //---------------------------------
        // Have the canvas set as full screen or fill its container's space
        if( config.fullscreen ){
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        }else{
            // Take the size of the parent element.
            const { width, height } = this.renderer.domElement.parentNode.getBoundingClientRect();

            this.renderer.setSize( width , height );

            // When changing the canvas size, need to update the Projection Aspect Ratio to render correctly.
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // MISC
        this.orbit = new OrbitControls( this.camera, config.container );
        // this.orbit.maxPolarAngle  = Math.PI / 2.5;
        // this.orbit.minDistance  = 5;
        // this.orbit.maxDistance  = 25;

        if( config.grid ) this.scene.add( new THREE.GridHelper( 20, 20, 0x0c610c, 0x444444 ) );
        this.createGlow();
        window.game = this;
    }

    render(){
        requestAnimationFrame( this.render_bind );

        this.deltaTime      = this.clock.getDelta();
        this.elapsedTime    = this.clock.elapsedTime;

        if( this.onRender ) this.onRender( this.deltaTime, this.elapsedTime );

        TWEEN.update()
        this.renderer.clear();
        this.renderer.render( this.scene, this.camera );
        this.composer.render();
    }
    // #endregion ////////////////////////////////////////////////////////////////////////////////////////

    // #region METHODS
    add( o ){ this.scene.add( o ); return this; }
    remove( o ){ this.scene.remove( o ); return this; }

    setCamera(lon, lat, radius, target ){
        let phi     = ( 90 - lat ) * Math.PI / 180,
            theta   = ( lon + 180 ) * Math.PI / 180;

        this.camera.position.set(
            -(radius * Math.sin( phi ) * Math.sin(theta)),
            radius * Math.cos( phi ),
            -(radius * Math.sin( phi ) * Math.cos(theta))
        );

        if( target ) this.orbit.target.fromArray( target );

        this.orbit.update();
        return this;
    }
    // #endregion ////////////////////////////////////////////////////////////////////////////////////////

    createGlow() {
        // TODO: See if this is needed
        const composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        composer.addPass(renderPass);
        // const bloomPass = new BloomPass(1, 15, 10, 256);
        // const bloomPass = new UnrealBloomPass(1, 25, 5, 256);
        // composer.addPass(bloomPass);
        // const copyPass = new ShaderPass(CopyShader);
        // copyPass.renderToScreen = true;
        // composer.addPass(copyPass);
        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
        composer.addPass(gammaCorrectionPass);

        this.composer = composer;

        this.outlinePass = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            this.scene,
            this.camera
        );
        this.outlinePass.edgeStrength = 3.0;
        this.outlinePass.edgeGlow = 1.0;
        this.outlinePass.edgeThickness = 3.0;
        this.outlinePass.pulsePeriod = 0;
        this.outlinePass.usePatternTexture = false; // patter texture for an object mesh
        this.outlinePass.visibleEdgeColor.set("#1abaff"); // set basic edge color
        this.outlinePass.hiddenEdgeColor.set("#1abaff"); // set edge color when it hidden by other objects
        this.composer.addPass(this.outlinePass);
    }

    addOutline(objects) {
        this.outlinePass.selectedObjects = objects;
    }
}

export default RenderEngine;
export { THREE };