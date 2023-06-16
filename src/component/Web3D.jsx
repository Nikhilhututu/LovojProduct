import React, { useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
let threeContainer;
let mShirtObj;
const Web3D = () => {
    threeContainer = useRef(null);
    React.useEffect(()=>{
        if(threeContainer.current)
            return;
            mShirtObj = new Shirt3d();
        // init3D();
    },[])
    return (
        <Wrapper id='3d-container'></Wrapper>
    );
};
export default Web3D;

export class Shirt3d{
    constructor(){
        threeContainer.current = document.getElementById('3d-container');
        this.scene  = null;
        this.camera = null;
        this.render = null;
        this.textureLoader = null;
        this.glbLoader= null;
        this.dirLight=null;
        this.hemiSphereLight = null;
        this.orbitController  = null;
        this.canvasW = 0;
        this.canvasH = 0;
        this.shirtRoot=null;
        this.init();
    }
    init(){
        this.canvasW = threeContainer.current.clientWidth;
        this.canvasH = threeContainer.current.clientHeight;
        this.scene   = new THREE.Scene("shirt_scene");
        this.camera = new THREE.PerspectiveCamera(60,this.canvasW/this.canvasH,.1,1000);
        this.camera.position.set(0,0,10);
        this.render = new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
        // this.render.autoClear=false;
        this.render.outputColorSpace=THREE.SRGBColorSpace;
        this.render.setPixelRatio(window.devicePixelRatio);
        this.render.setClearColor(0x000000,0);
        this.render.setSize(this.canvasW,this.canvasH);
        this.render.shadowMap.enabled=true;
        this.render.shadowMap.type = THREE.PCFSoftShadowMap;
        threeContainer.current.appendChild(this.render.domElement);
        this.initLight();
        this.loadAsset();
        this.initOrbitController();
        this.render.setAnimationLoop(()=>this.renderScene());
        window.addEventListener("resize",()=>{
            this.resize();
        })
    }
    initLight(){
        this.dirLight = new THREE.DirectionalLight(0x000000,2);
        this.dirLight.position.set(0,5,10);
        this.dirLight.shadow.mapSize.width = 512;
        this.dirLight.shadow.mapSize.height= 512;
        this.dirLight.shadow.camera.near=.1;
        this.dirLight.shadow.camera.far=1000;
        this.scene.add(this.dirLight);

        this.hemiSphereLight = new THREE.HemisphereLight(0xffffff,0x000000,2);
        this.hemiSphereLight.position.set(0,10,0);
        this.scene.add(this.hemiSphereLight);
    }
    initOrbitController(){
        this.orbitController = new OrbitControls(this.camera,this.render.domElement);
        this.orbitController.enablePan = false;
        this.orbitController.minDistance = 8.5;
        this.orbitController.maxDistance = 8.5;
        this.orbitController.update();
        this.orbitController.enabled=false;
    }
    renderScene(){
        this.render.render(this.scene,this.camera);
        
    }
    resize(){
        this.canvasW=threeContainer.current.clientWidth;
        this.canvasH=threeContainer.current.clientHeight;
        this.camera.aspect = this.canvasW/this.canvasH;
        this.camera.updateProjectionMatrix();
        this.render.setSize(this.canvasW,this.canvasH);
    }
    loadAsset(){
        this.glbLoader = new GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();
        const planGeometry = new THREE.PlaneGeometry(6,10,32,32);
        this.maleMesh  = new THREE.Mesh(planGeometry);
        this.maleMesh.name="male_pos";
        const texture   = this.textureLoader.load("3dmodel/male_y.png");
        texture.colorSpace = THREE.SRGBColorSpace;
        const maleMat = new THREE.MeshBasicMaterial({map:texture});
        maleMat.alphaTest=true;
        this.maleMesh.material = maleMat;
        this.scene.add(this.maleMesh);

        this.glbLoader.load("3dmodel/new/complete_shirt.glb",(gltf)=>{
            this.shirtRoot = gltf.scene;
            this.shirtRoot.traverse((child)=>{
                if(child.isMesh){
                    // child.material.color = new THREE.Color(0xffffff);
                    // child.material.depthTest=false;
                    child.receiveShadow = true;
                    if(child.name.includes("short_sleeves")){
                        child.visible=false;
                    }
                    if(child.name.includes("button") || child.name.includes("thread")){
                        child.material.map=null;
                        child.material.normalMap=null;
                    }
                    if(child.name.includes("normal_collar")){
                        child.visible=true;
                    }
                    if(child.name.includes("stand_collar")){
                        child.visible=false;
                    }
                    console.log(child.name);
                }
            });
            this.shirtRoot.scale.set(2,2,.1);
            this.shirtRoot.position.z=.05;
            this.scene.add(this.shirtRoot);
        })
    }
    changeShirt(isFull){
        this.shirtRoot.traverse((child)=>{
            if(child.isMesh){
                if(child.name.includes("full_sleeves")){
                    child.visible=isFull;
                }
                if(child.name.includes("short_sleeves")){
                    child.visible=!isFull;
                }
                if(child.name.includes("cuffs")){
                    child.visible=isFull;
                }
                
            }
        });
    }
    changeCollar(isNormalCollar){
        this.shirtRoot.traverse((child)=>{
            if(child.isMesh){
                if(child.name.includes("normal_collar")){
                    child.visible=isNormalCollar;
                }
                if(child.name.includes("stand_collar")){
                    child.visible=!isNormalCollar;
                }
            }
        });
    }
    changeShirtTexture(isFull,tex){
        const texture  = this.textureLoader.load(tex);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter  = THREE.NearestFilter;
        texture.repeat.set( 1, 1);
        this.shirtRoot.traverse((child)=>{
            if(child.isMesh){
                if(!child.name.includes("thread")  && !child.name.includes("button")){ //&& !child.name.includes("placket")
                  this.applyTexture(child,texture);
                }
            }
         })
         document.getElementById("my-file").value = "";
     } 
     changeCollarTexture(tex){
        const texture  = this.textureLoader.load(tex);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter  = THREE.NearestFilter;
        texture.repeat.set( 1, 1);
        this.shirtRoot.traverse((child)=>{
            if(child.isMesh){
                if(child.name.includes("collar")){
                  this.applyTexture(child,texture);
                }
            }
         })
        document.getElementById("my-file").value = "";
     } 
     changeButtonColor(color,type){
        this.shirtRoot.traverse((child)=>{
            if(child.isMesh){
                if(child.name.includes("button") && type==="button"){
                    child.material.color = new THREE.Color(color);
                    child.material.metalness=0;
                    child.material.roughness =1;
                }
                else if(child.name.includes("thread") && type==="thread"){
                    child.material.color = new THREE.Color(color);
                    child.material.metalness=0;
                    child.material.roughness =1;
                }
            }
         })
     } 
     applyTexture(child,texture){
        child.material.map = texture;
        child.material.map.flipY = false;
        child.material.needsUpdate = true;
     }
}


export const changeTexture=(isFull,tex)=>{
    //  if(isFull){
    //     fullSleevShirt.traverse((child)=>{
    //         if(child.isMesh){
    //            const texture  = textureLoader.load(tex);
    //             texture.colorSpace = THREE.SRGBColorSpace;
    //             texture.wrapS = THREE.RepeatWrapping;
    //             texture.wrapT = THREE.RepeatWrapping;
    //             texture.magFilter = THREE.NearestFilter;
    //             texture.minFilter  = THREE.NearestFilter;
    //             texture.repeat.set( 1, 1);
    //             child.material.map = texture;
    //             child.material.map.flipY = false;
    //             child.material.needsUpdate = true;
    //         }
    //    })
    //  } 
    //  else{
    //         shortShirt.traverse((child)=>{
    //             if(child.isMesh){
    //                 console.log("^^^^^^^^^^^^^")
    //                const texture  = textureLoader.load(tex);
    //                texture.colorSpace = THREE.SRGBColorSpace;
    //                texture.wrapS = THREE.RepeatWrapping;
    //                texture.wrapT = THREE.RepeatWrapping;
    //                texture.magFilter = THREE.NearestFilter;
    //                texture.minFilter  = THREE.NearestFilter;
    //                texture.repeat.set( 1, 1);
    //                child.material.map = texture;
    //                child.material.map.flipY = false;
    //                child.material.needsUpdate = true;
    //             }
    //        })
    //     } 
    //     document.getElementById("myFile").value = "";
      
}
 const planeCurve=(g, z)=>{
    let p = g.parameters;
    let hw = p.width * 0.5;
    
    let a = new THREE.Vector2(-hw, 0);
    let b = new THREE.Vector2(0, z);
    let c = new THREE.Vector2(hw, 0);
    
    let ab = new THREE.Vector2().subVectors(a, b);
    let bc = new THREE.Vector2().subVectors(b, c);
    let ac = new THREE.Vector2().subVectors(a, c);
    
    let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
    
    let center = new THREE.Vector2(0, z - r);
    let baseV = new THREE.Vector2().subVectors(a, center);
    let baseAngle = baseV.angle() - (Math.PI * 0.5);
    let arc = baseAngle * 2;
    
    let uv = g.attributes.uv;
    let pos = g.attributes.position;
    let mainV = new THREE.Vector2();
    for (let i = 0; i < uv.count; i++){
        let uvRatio = 1 - uv.getX(i);
      let y = pos.getY(i);
      mainV.copy(c).rotateAround(center, (arc * uvRatio));
      pos.setXYZ(i, mainV.x, y, -mainV.y);
    }
    
    pos.needsUpdate = true;
    
  }
const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  z-index: -1;
  position: fixed;
  background-color: #9BA4B5;
`

export {mShirtObj};