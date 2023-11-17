import React, { useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { CiHome } from "react-icons/ci";
import * as CONFIG_DATA from '../ConfigData';
import { GENDER } from './Home';
import { NavLink } from 'react-router-dom';
let threeContainer;
let mShirtObj;
const cloth_scale = .0176;
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
            <div className='view_main_container'>
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
             </div>
            <div className='three_container' id='3d-container'>
                    <NavLink to={"/"} className={'nav_link'}>
                        <CiHome className='home_btn'/>
                    </NavLink>
            </div>
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
        this.male     = {model:"",texture:""};
        
        this.length   = {model:"",texture:""};
        this.front    = {model:"",texture:""};
        this.back     = {model:"",texture:""};        
        this.sleeves  = {model:"",texture:""};        

        this.shirt    = {model:"",texture:""};
        this.trouser  = {model:"",texture:""};
        this.shirt_back  = {model:"",texture:""};        
        this.shirt_collar = {model:"",texture:""};        
        this.shirt_cuffs = {model:"",texture:""};        
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

        if(GENDER.type ==='male'){
            const ratio = 1;
            const scale = .75;
            const planGeometry = new THREE.PlaneGeometry(scale,scale*ratio,32,32);
            this.maleMesh  = new THREE.Mesh(planGeometry);
            this.maleMesh.name="male_face";
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

            this.glbLoader.load("3dmodel/male_model.glb",(gltf)=>{
                this.male.model = gltf.scene;
                this.modelRoot.add(this.male.model);
                this.male.model.scale.set(cloth_scale,cloth_scale,cloth_scale);
                
            })
            this.glbLoader.load("3dmodel/shirt.glb",(gltf)=>{
                this.shirt.model = gltf.scene;
                this.modelRoot.add(this.shirt.model);
                this.shirt.model.scale.set(cloth_scale,cloth_scale,cloth_scale);
                this.updateTexture(this.shirt.model,'./texture/texture.jpg');
            })
            this.glbLoader.load("3dmodel/trouser.glb",(gltf)=>{
                this.trouser.model = gltf.scene;
                this.modelRoot.add(this.trouser.model);
                this.trouser.model.scale.set(cloth_scale,cloth_scale,cloth_scale*.965);
                this.trouser.model.traverse((child)=>{
                    if(child.isMesh){
                        child.material.color = new THREE.Color(0x000000) ;
                    }
                });
            })
            this.loadMaleModel(CONFIG_DATA.ShirtData.back_model.url,CONFIG_DATA.MALE_CHANGE_TYPES.back);
            this.loadMaleModel(CONFIG_DATA.ShirtData.cuff_model.url,CONFIG_DATA.MALE_CHANGE_TYPES.cuffs);
            this.loadMaleModel(CONFIG_DATA.ShirtData.collar_model.url,CONFIG_DATA.MALE_CHANGE_TYPES.collar);
        }
        else{
            this.glbLoader.load("3dmodel/girl_model.glb",(gltf)=>{
                this.male.model = gltf.scene;
                this.modelRoot.add(this.male.model);
                this.male.model.scale.set(cloth_scale,cloth_scale,cloth_scale);
            })
        }

        
        // this.loadModel("3dmodel/collar/standard.glb",CONFIG_DATA.CHANGE_TYPES.collar);
        // this.loadModel("3dmodel/male/trouser.glb",'');
        this.scene.add(this.modelRoot);
        this.modelRoot.rotation.y = 0;
        this.modelRoot.position.y = .8;
        this.camera.lookAt(new THREE.Vector3(0,2.5,0));
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
                case "1":
                    pos.z -=pos.val;
                    break;
                case "2":
                    pos.z +=pos.val;
                    break;
                default:
                    break;    
             }
            //  console.log("!!! pos!! ",pos);
            //  this.collar.model.position.set(0,pos.y,pos.z);
            // this.modelRoot.scale.x=.02;
        })
        this.loadingManager.onStart=(url, itemsLoaded, itemsTotal)=>{
            document.getElementById("loader").style.display = "flex";
            // document.getElementsByClassName("loader")[0].style.backgroundColor  =  "rgba(0,0,0,.85)";
        }
        this.loadingManager.onLoad=()=>{
            // console.log('Loading completed');
            document.getElementById("loader").style.display = "none";
        }
    }
    cleanObject(model){
        if(!model)
           return;
         model.traverse((child)=>{
             if(child.material)
                 child.material.dispose();
             if(child.geometry)
                 child.geometry.dispose();
         });
         this.modelRoot.remove(model);
         model = null;
     }
    loadMaleModel(path,type){
        switch(type){
            case CONFIG_DATA.MALE_CHANGE_TYPES.back:
                    this.cleanObject(this.shirt_back.model);
                break;
            case CONFIG_DATA.MALE_CHANGE_TYPES.collar:
                    this.cleanObject(this.shirt_collar.model);
                break;
            case CONFIG_DATA.MALE_CHANGE_TYPES.cuffs:
                    this.cleanObject(this.shirt_cuffs.model);
                break;
            default:
                break;
        }
        this.glbLoader.load(path,(gltf)=>{
            const tmpModel = gltf.scene;
            
            switch(type){
                case CONFIG_DATA.MALE_CHANGE_TYPES.back:
                        tmpModel.scale.set(cloth_scale,cloth_scale,cloth_scale);
                        this.shirt_back.model = tmpModel;
                        if(this.shirt_back.texture){
                            this.updateTexture(this.shirt_back.model,this.shirt_back.texture);
                        }
                        else{
                            this.updateTexture(this.shirt_back.model,'./texture/texture.jpg');
                        }    
                            
                    break;
                case CONFIG_DATA.MALE_CHANGE_TYPES.cuffs:
                        tmpModel.scale.set(cloth_scale,cloth_scale,cloth_scale);
                        this.shirt_cuffs.model = tmpModel;
                        if(this.shirt_cuffs.texture)
                            this.updateTexture(this.shirt_cuffs.model,this.shirt_cuffs.texture);
                        else    
                            this.updateTexture(this.shirt_cuffs.model,'./texture/texture.jpg');
                        
                    break;
                case CONFIG_DATA.MALE_CHANGE_TYPES.collar:
                        console.log("",tmpModel);
                        this.shirt_collar.model = tmpModel;
                        tmpModel.scale.set(cloth_scale,cloth_scale,cloth_scale);
                        // this.shirt_collar.model.scale.set(.0018,.0018,.0018);
                        // this.shirt_collar.model.position.set(0,-.09,-.04) ;
                        if(this.shirt_collar.texture)
                             this.updateTexture(this.shirt_collar.model,this.shirt_collar.texture);
                         else    
                             this.updateTexture(this.shirt_collar.model,'./texture/texture.jpg');
                    break;
                default:
                    break;    
            }
            this.modelRoot.add(tmpModel);
        })
    }  
    loadFemaleModel(path,type){
            switch(type){
                case CONFIG_DATA.FEMALE_CHANGE_TYPES.length:
                        this.cleanObject(this.length.model);
                    break;
                case CONFIG_DATA.FEMALE_CHANGE_TYPES.front:
                        this.cleanObject(this.front.model);
                    break;
                case CONFIG_DATA.FEMALE_CHANGE_TYPES.back:
                        this.cleanObject(this.back.model);
                    break;
                case CONFIG_DATA.FEMALE_CHANGE_TYPES.sleeves:
                        this.cleanObject(this.sleeves.model);
                    break;
                default:
                    break;
            }
            this.glbLoader.load(path,(gltf)=>{
                const tmpModel = gltf.scene;
                tmpModel.scale.set(cloth_scale,cloth_scale,cloth_scale);
                switch(type){
                    case CONFIG_DATA.FEMALE_CHANGE_TYPES.length:
                            this.length.model = tmpModel;
                            if(this.length.texture){
                                this.updateTexture(this.length.model,this.length.texture);
                            }
                            else{
                                this.updateTexture(this.length.model,'./texture/texture.jpg');
                            }    
                                
                        break;
                    case CONFIG_DATA.FEMALE_CHANGE_TYPES.front:
                            this.front.model = tmpModel;
                            if(this.front.texture)
                                this.updateTexture(this.front.model,this.front.texture);
                            else    
                                this.updateTexture(this.front.model,'./texture/texture.jpg');
                            
                        break;
                    case CONFIG_DATA.FEMALE_CHANGE_TYPES.back:
                            this.back.model = tmpModel;
                            if(this.back.texture)
                                 this.updateTexture(this.back.model,this.back.texture);
                             else    
                                 this.updateTexture(this.back.model,'./texture/texture.jpg');
                        break;
                    case CONFIG_DATA.FEMALE_CHANGE_TYPES.sleeves:
                            this.sleeves.model = tmpModel;
                            if(this.sleeves.texture)
                                 this.updateTexture(this.sleeves.model,this.sleeves.texture);
                             else    
                                 this.updateTexture(this.sleeves.model,'./texture/texture.jpg');
                        break;
                    default:
                        break;    
                }
                this.modelRoot.add(tmpModel);
            })
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
           default:
                break;     
        }
        if(GENDER.type ==='male'){
            this.maleMesh.material.needsUpdate= true;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter  = THREE.NearestFilter;
            this.maleMesh.material.map = texture;
        }
    }
    updateTexture(model,tex){
        console.log(tex);
        const texture  = this.textureLoader.load(tex);
        model.traverse((child)=>{
            if(child.isMesh){
                this.applyTexture(child,texture);
            }
        })
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
            default:
                break;    
        }
     }
     applyTexture(child,texture){
        if(texture){
            console.log("^^^^^^^^^^^^")
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter  = THREE.NearestFilter;
            texture.repeat.set(.002, .002);
            texture.center.x = 0;
            texture.center.y = 0;
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
   height: 100%;
   z-index: -1;
   background-color: #9BA4B5;
   position: absolute;
   .three_container{
     position: absolute;
      top: 0%;
      width: 100%;
      height: 100%;
      z-index: -1;
      .home_btn{
            position: absolute;
            user-select: none;
            padding: .5rem 2rem;
            font-size: 2rem;
            width: fit-content;
            color: #fff;
            cursor: pointer;
            &:active{
                transform: scale(.9);
            }
        } 
       .nav_link{
            text-decoration: none;
            &:link,
            &:visited{
                color: black;
            }
        }  
   }
   .view_main_container{
     margin: auto;
     width: 100%;
     display: grid;
     align-content: center;
     place-items:center;
   }
   .view_container{
         margin: 1rem;
         display: flex;
         gap: 1rem;
         text-transform: capitalize;
         pointer-events: all;
         cursor: pointer;
         user-select: none;
         bottom: 0%;
         position: absolute;
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
        .view_main_container{
            /* place-items:initial; */
        }
        .view_container{
            /* width: fit-content; */
            /* flex-direction: column; */
            /* position: relative; */
        }
        .three_container{
            .home_btn{
                
            }
        }
    }

`

export {mShirtObj};