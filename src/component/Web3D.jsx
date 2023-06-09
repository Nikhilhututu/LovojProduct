import React, { useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
let threeContainer,mOrbitController,mScene,mRender,mCamera,mLight,textureLoader;
let loader,width,height;
let fullSleevShirt,shortShirt;
let mBottle3d;
const Web3D = () => {
    threeContainer = useRef(null);
    React.useEffect(()=>{
        if(threeContainer.current)
            return;
        init3D();
    },[])
    return (
        <Wrapper id='3d-container'></Wrapper>
    );
};
export default Web3D;
const init3D=()=>{
    threeContainer.current = document.getElementById('3d-container');
    width   = threeContainer.current.clientWidth;
    height  = threeContainer.current.clientHeight;
    mScene  = new THREE.Scene("first-scene");
    // mScene.background = new THREE.Color(0xD8C4B6);
    // mScene.background = new THREE.Color(0x213555);
    mCamera = new THREE.PerspectiveCamera(75,width/height,.1,1000);
    mCamera.position.set(0,0,10);
    mRender = new THREE.WebGLRenderer({antialias: true,alpha:true,preserveDrawingBuffer: true});
    // mRender.outputColorSpace = THREE.SRGBColorSpace;
    mRender.setPixelRatio(window.devicePixelRatio);
    mRender.setClearColor(0x000000,0);
    mRender.setSize(width,height);
    mRender.shadowMap.enabled = true;
    mRender.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    threeContainer.current.appendChild(mRender.domElement);
    mRender.setAnimationLoop(renderScene);
    mLight  = new THREE.HemisphereLight( 0xffffff,0xffffff,.5);
    mLight.position.y=20;
    mScene.add(mLight);

    const dirLight  = new THREE.DirectionalLight( 0xffffff,.5);
    dirLight.position.set(0,20,20);
    mScene.add(dirLight);

    // const ambientLight = new THREE.AmbientLight(0xffffff,.5);
    // ambientLight.position.y=10;
    // mScene.add(ambientLight);

    mOrbitController = new OrbitControls(mCamera,mRender.domElement);
    mOrbitController.enablePan = false;
    console.log(mOrbitController.minZoom);
    mOrbitController.minDistance = 1;
    mOrbitController.maxDistance = 8;
    mOrbitController.update();
    mOrbitController.enabled=false;
    loadAsset();
}
const  renderScene=()=>{
    mRender.render(mScene,mCamera);
    
};
window.addEventListener("resize", ()=>{
    width   = threeContainer.current.clientWidth;
    height  = threeContainer.current.clientHeight;
    mCamera.aspect = width / height;
    mCamera.updateProjectionMatrix();
    mRender.setSize(width, height);
    mRender.render( mScene,mCamera);
 });

const loadAsset=()=>{
   loader = new GLTFLoader();
   textureLoader   = new THREE.TextureLoader();
 const root = new THREE.Object3D();

 const malePlan  = new THREE.PlaneGeometry(6,10,32,32);
 const maleMesh  = new THREE.Mesh(malePlan);
 maleMesh.name="male_pos";
 const texture   = textureLoader.load("3dmodel/male_y.png");
 texture.colorSpace = THREE.SRGBColorSpace;
 const maleMat = new THREE.MeshStandardMaterial({map:texture});
 maleMat.alphaTest=true;
 maleMesh.material = maleMat;
 root.add(maleMesh);
const shirt_tex      = textureLoader.load("3dmodel/texture/map.jpg");
const shirt_normal   = textureLoader.load("3dmodel/texture/normal.jpg");
const shirtMat = new THREE.MeshStandardMaterial({metalness:0,roughness:1});
// shirtMat.map.flipY = false;
// shirtMat.normalMap.flipY = false;
    const shortshirtMat = new THREE.MeshStandardMaterial({metalness:0,roughness:1});
    loader.load("3dmodel/new/ManShirtLongSleevesRedtextre.glb",(gltf)=>{
        fullSleevShirt = gltf.scene;
        fullSleevShirt.visible=true;
        fullSleevShirt.traverse((child)=>{
             if(child.isMesh){
                child.material.color = new THREE.Color(0xffffff);
                // child.material=shirtMat;
                child.material.depthTest = false;
                child.name = "full_sleeve";
                // child.material.depthWrite = false;
                // child.castShadow = true; //default is false
             }
        })
        fullSleevShirt.scale.set(2,2,.1);
        fullSleevShirt.position.z = .05;
        root.add(gltf.scene);
        // mScene.add(gltf.scene);
    })
    loader.load("3dmodel/new/ManShirtShortSleevesRedtextre.glb",(gltf)=>{
        shortShirt = gltf.scene;
        shortShirt.visible=false;
        shortShirt.scale.set(2,2,.1);
        shortShirt.position.z = .05;
        shortShirt.traverse((child)=>{
             if(child.isMesh){
                // shortshirtMat.color = new THREE.Color(0xffffff);
                console.log(child.material);
                child.material.color = new THREE.Color(0xffffff);
                child.material.depthTest = false;
                child.name = "half_sleeve";
                // child.material=shortshirtMat;
                // child.castShadow = true; //default is false
             }
        })
        root.add(gltf.scene);
    })
    mScene.add(root);
    // const parent = new THREE.Object3D();
    // loader.load("3dmodel/bottle.glb",(gltf)=>{
    //     mBottle3d = gltf.scene;
    //     parent.add(mBottle3d);
    //     mBottle3d.scale.set(20,20,20);
    //     mBottle3d.position.y-=3;
    //     const logo = textureLoader.load("3dmodel/navy-laser-ready.png");
    //     logo.colorSpace = THREE.SRGBColorSpace;
    //     const planGeometry = new THREE.PlaneGeometry(1.267,1,32,32);
    //     planeCurve(planGeometry,.2);
    //     const logoMesh = new THREE.Mesh(planGeometry);
    //     logoMesh.scale.set(1,1,-1);
    //     const mat = new THREE.MeshBasicMaterial({map:logo,side:THREE.DoubleSide});
    //     mat.transparent=true;
    //     mat.color = new THREE.Color(0xffffff);
    //     logoMesh.material = mat;
    //     logoMesh.position.set(0,-1,.8145);
    //     logoMesh.rotation.set(0,.25,0);
    //     parent.add(logoMesh);
    //     const logoMesh2 = logoMesh.clone();
    //     logoMesh2.position.set(0,-1,-.58);
    //     logoMesh2.rotation.set(0,-.25,0);
    //     logoMesh2.scale.set(-1,1,1);
    //     parent.add(logoMesh2);
    //     mBottle3d.traverse((child)=>{
    //          if(child.isMesh){
    //             // console.log(child.material)
    //             // child.material.map.colorSpace = THREE.SRGBColorSpace;;
    //          }
    //     })
    //     mScene.add(parent);
    // })
}
export const changeTexture=(isFull,tex)=>{
     if(isFull){
        fullSleevShirt.traverse((child)=>{
            if(child.isMesh){
                console.log("!!!!!!!!!!!!!!!!!!");
               const texture  = textureLoader.load(tex);
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // texture.magFilter = THREE.NearestFilter;
                // texture.minFilter  = THREE.NearestFilter;
                texture.repeat.set( 1, 1);
                child.material.map = texture;
                child.material.map.flipY = false;
                child.material.needsUpdate = true;
               
            }
       })
     } 
     else{
            shortShirt.traverse((child)=>{
                if(child.isMesh){
                    console.log("^^^^^^^^^^^^^")
                   const texture  = textureLoader.load(tex);
                   texture.colorSpace = THREE.SRGBColorSpace;
                   texture.wrapS = THREE.RepeatWrapping;
                   texture.wrapT = THREE.RepeatWrapping;
                //    texture.magFilter = THREE.NearestFilter;
                   texture.repeat.set( 1, 1);
                   child.material.map = texture;
                   child.material.map.flipY = false;
                   child.material.needsUpdate = true;
                }
           })
        } 
        document.getElementById("myFile").value = "";
      
}
export const changeShirt=(isFull)=>{
    console.log(isFull)
    fullSleevShirt.visible= isFull?true:false;
    shortShirt.visible    = !isFull?true:false;
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