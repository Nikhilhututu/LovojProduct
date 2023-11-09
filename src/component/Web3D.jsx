import React, { useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
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
    const onClickView=(type)=>{
        mShirtObj.changeView(type);
    }
    return (
        <Wrapper >
            <div className='loader_container' id='loader'>
               <div className='lds-dual-ring'></div>
            </div>
            <div className='view_container'>
                 <div onClick={()=>{
                    onClickView(0);
                 }}>
                    Front
                 </div>
                  <div onClick={()=>{
                     onClickView(1);
                  }}>
                      back
                  </div>
                  <div onClick={()=>{
                     onClickView(2);
                  }}>
                      side
                  </div>
             </div>  
            <div className='three_container' id='3d-container'></div>
        </Wrapper>
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
        this.modelRoot= null;
        this.shirt    = {model:"",texture:""};
        this.trouser  = {model:"",texture:""};
        this.male     = {model:"",texture:""};
        this.init();
    }
    init(){
        this.canvasW = threeContainer.current.clientWidth;
        this.canvasH = threeContainer.current.clientHeight;
        this.scene   = new THREE.Scene("shirt_scene");
        this.camera = new THREE.PerspectiveCamera(60,this.canvasW/this.canvasH,.1,1000);
        this.camera.position.set(0,3.5,3.5);
        
        this.render = new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
        // this.render.autoClear=false;
        this.render.outputColorSpace=THREE.SRGBColorSpace;
        this.render.setPixelRatio(window.devicePixelRatio);
        this.render.setClearColor(0x000000,0);
        this.render.setSize(this.canvasW,this.canvasH);
        // this.render.shadowMap.enabled=true;
        // this.render.shadowMap.type = THREE.PCFSoftShadowMap;
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
        this.dirLight = new THREE.DirectionalLight(0xffffff,.5);
        this.dirLight.position.set(0,3,5);
        // this.dirLight.shadow.mapSize.width = 512;
        // this.dirLight.shadow.mapSize.height= 512;
        // this.dirLight.shadow.camera.near=.1;
        // this.dirLight.shadow.camera.far=1000;
        this.scene.add(this.dirLight);
        
        // this.dirLight2 = new THREE.DirectionalLight(0xffffff,1);
        // this.dirLight2.position.set(0,3,-15);
        // this.dirLight2.shadow.mapSize.width = 512;
        // this.dirLight2.shadow.mapSize.height= 512;
        // this.dirLight2.shadow.camera.near=.1;
        // this.dirLight2.shadow.camera.far=1000;
        // this.scene.add(this.dirLight2);

        this.hemiSphereLight = new THREE.HemisphereLight(0xffffff,0xffffff,.5);
        this.hemiSphereLight.position.set(0,10,0);
        this.scene.add(this.hemiSphereLight);
    }
    initOrbitController(){
        // this.orbitController = new OrbitControls(this.camera,this.render.domElement);
        // this.orbitController.enablePan = false;
        // this.orbitController.target.set(0,2,0);
        // this.orbitController.minDistance = 3.2;
        // this.orbitController.maxDistance = 3.2;
        // this.orbitController.minPolarAngle = Math.PI/2;
        // this.orbitController.maxPolarAngle = Math.PI/2;
        // this.orbitController.update();
        // this.orbitController.enabled=false;
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
        this.loadingManager = new THREE.LoadingManager();
        this.modelRoot = new THREE.Object3D();
        this.glbLoader = new GLTFLoader(this.loadingManager);
        this.dracoLoader = new DRACOLoader(this.loadingManager);
        this.dracoLoader.setDecoderPath('./draco/gltf/');
        this.glbLoader.setDRACOLoader(this.dracoLoader);
        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
        const ratio = 1;
        const scale = .75;
        const planGeometry = new THREE.PlaneGeometry(scale,scale*ratio,32,32);
        this.maleMesh  = new THREE.Mesh(planGeometry);
        this.maleMesh.name="male_pos";
        const texture   = this.textureLoader.load("3dmodel/body_images/front_face.png");
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter  = THREE.NearestFilter;
        
        const maleMat = new THREE.MeshBasicMaterial({map:texture});
        maleMat.alphaTest=true;
        this.maleMesh.material = maleMat;
        this.maleMesh.position.set(0,3.84,-.010);
        this.scene.add(this.maleMesh);

        const cloth_scale = .0176;
        this.glbLoader.load("3dmodel/male/scene.glb",(gltf)=>{
            this.male.model = gltf.scene;
            this.modelRoot.add(this.male.model);
            this.male.model.scale.set(cloth_scale,cloth_scale,cloth_scale);
        })
        this.glbLoader.load("3dmodel/male/shirt.glb",(gltf)=>{
            this.shirt.model = gltf.scene;
            this.shirt.model.scale.set(cloth_scale,cloth_scale,cloth_scale);
            // this.shirt.model.renderOrder=0;
            this.modelRoot.add(this.shirt.model);
            this.shirt.model.traverse((child)=>{
                if(child.isMesh){
                    this.updateTexture("shirt",'3dmodel/body_images/texture.jpg');
                }
            })
        })
        this.glbLoader.load("3dmodel/male/trouser.glb",(gltf)=>{
            this.trouser.model = gltf.scene;
            this.trouser.model.scale.set(cloth_scale,cloth_scale,cloth_scale);
            this.modelRoot.add(this.trouser.model);
            // this.trouser.model.position.y=-.06;
            this.trouser.model.traverse((child)=>{
                if(child.isMesh){
                    child.material.dispose();
                    child.material.needsUpdate = true;
                    // child.material = new THREE.MeshStandardMaterial();
                    child.material.color = new THREE.Color(0x000000);
                    child.material.roughness=1;
                    child.material.metalness=0;
                //   child.material.depthTest = false;
                //   child.material.renderOrder=10;
                }
            })
            this.scene.add(this.modelRoot);
        })
        this.scene.add(this.modelRoot);
        this.modelRoot.rotation.y = 0;
        this.modelRoot.position.y = .8;
        this.camera.lookAt(new THREE.Vector3(0,2.5,0))
        const pos = {x:0,y:0,z:0,val:.01};

        document.addEventListener("keydown",(e)=>{
            // console.log(e.key) ;
             switch(e.key){
                 case "ArrowLeft":
                        pos.x -=pos.val;
                    break;
                case "ArrowRight":
                    pos.x +=pos.val;
                    break;
                case "ArrowUp":
                    pos.y +=pos.val;
                    break;
                case "ArrowDown":
                    pos.y -=pos.val;
                    break;
             }
             console.log("!!! pos!! ",pos);
            //  this.maleMesh.position.set(0,pos.x,pos.y);
            // this.modelRoot.scale.x=.02;
        })
        this.loadingManager.onStart=(url, itemsLoaded, itemsTotal)=>{
            // console.log('Loading started');
            document.getElementById("loader").style.display = "flex";
            // document.getElementsByClassName("loader")[0].style.backgroundColor  =  "rgba(0,0,0,.85)";
        }
        this.loadingManager.onLoad=()=>{
            // console.log('Loading completed');
            document.getElementById("loader").style.display = "none";
        }
    }
    changeView(type){
        let texture;
        switch(type){
            case 0 :
                    texture   = this.textureLoader.load("3dmodel/body_images/front_face.png");
                    this.modelRoot.rotation.y = 0;
                break;
            case 1 :
                    texture   = this.textureLoader.load("3dmodel/body_images/back_face.png");
                    this.modelRoot.rotation.y = Math.PI;
                break;
            case 2 :
                    texture   = this.textureLoader.load("3dmodel/body_images/side_face.png");
                    this.modelRoot.rotation.y = Math.PI/3;
                break;
        }
        this.maleMesh.material.needsUpdate= true;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter  = THREE.NearestFilter;
        this.maleMesh.material.map = texture;
    }
     
    updateTexture(type,tex){
        console.log(tex);
        const texture  = this.textureLoader.load(tex);
        switch(type){
            case 'shirt':
                this.shirt.model.traverse((child)=>{
                    if(child.isMesh){
                        this.applyTexture(child,texture);
                    }
                })
            break;
            case 'collar':
                this.shirt.model.traverse((child)=>{
                    if(child.isMesh && child.name.includes("collar")){
                        this.applyTexture(child,texture);
                    }
                })
                break;
            case 'cuffs':
                this.shirt.model.traverse((child)=>{
                    if(child.isMesh && child.name.includes("cuff")){
                        this.applyTexture(child,texture);
                    }
                })
             break;
        }
        //  document.getElementById("my-file").value = "";
     } 
     updateColor(type,color){
        switch(type){
            case 'shirt':
                this.shirt.model.traverse((child)=>{
                    if(child.isMesh){
                        child.material.color = new THREE.Color(color);
                    }
                })
                break;
            case 'collar':
                this.shirt.model.traverse((child)=>{
                    if(child.isMesh && child.name.includes("collar")){
                        child.material.color = new THREE.Color(color);
                    }
                })
                break;
            case 'cuffs':
                this.shirt.model.traverse((child)=>{
                    if(child.isMesh && child.name.includes("cuff")){
                        child.material.color = new THREE.Color(color);
                    }
                })
                break;
        }
     }
     applyTexture(child,texture){
        if(texture){
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter  = THREE.NearestFilter;
            texture.repeat.set( .002, .002);
            texture.center.x = .5;
            texture.center.y = .5;
        }
        if(child.material){
            child.material.dispose();
        }
        // const material = new THREE.MeshStandardMaterial();
        // child.material = new THREE.MeshBasicMaterial();
        child.material.map = texture;
        child.material.roughness=1;
        child.material.metalness=0;
        // child.material.map.flipY = false;
        child.material.needsUpdate = true;
     }
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
   .three_container{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0%;
      z-index: -1;
   }
   .view_container{
         margin: 1rem;
         display: flex;
         gap: 1rem;
         text-transform: capitalize;
         pointer-events: all;
         cursor: pointer;
         user-select: none;
         div{
             padding: .25rem 1.5rem;
             border: 1px solid #213555;
             border-radius: 5px;
             background-color: #DDE6ED;
             &:active{
                transform: scale(.9);
             }
         }
    }
   .loader_container{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.9);
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .lds-dual-ring{
      display: inline-block;
      width: 5rem;
      height: 5rem;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 2rem;
        height: 2rem;
        margin: 8px;
        border-radius: 50%;
        border: 2px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @media screen and (max-width:768px){
        .view_container{
            width: fit-content;
            flex-direction: column;
        }
    }

`

export {mShirtObj};