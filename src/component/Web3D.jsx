import React, { useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
let threeContainer,mScene,mRender,mCamera,mLight,textureLoader;
let loader,width,height;
let fullSleevShirt,shortShirt;
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
    
    mScene.background = new THREE.Color( 0xD8C4B6);
    mCamera = new THREE.PerspectiveCamera(75,width/height,.1,1000);
    mCamera.position.set(0,0,10);
    mLight  = new THREE.HemisphereLight( 0xffffff,0xffffff,1);
    mRender = new THREE.WebGL1Renderer({alpha:true,antialias:true});
    mRender.outputEncoding = THREE.sRGBEncoding;
    mRender.setSize(width,height);
    threeContainer.current.appendChild( mRender.domElement);
    mRender.setAnimationLoop(renderScene);
    mScene.add(mLight);
    loadAsset();
    window.addEventListener("resize", ()=>{
       mCamera.aspect = window.innerWidth / window.innerHeight;
       mCamera.updateProjectionMatrix();
       mRender.setSize(window.innerWidth, window.innerHeight);
    });
}
const renderScene=()=>{
    mRender.render( mScene,mCamera);
}
const loadAsset=()=>{
 textureLoader = new THREE.TextureLoader();
 const malePlan = new THREE.PlaneGeometry(6,10,32,32);
 const maleMesh     = new THREE.Mesh(malePlan);
 const texture  = textureLoader.load("3dmodel/male_y.png");
 texture.colorSpace = THREE.SRGBColorSpace;
 const maleMat = new THREE.MeshBasicMaterial({map:texture});
 maleMat.transparent=true;
 maleMesh.material = maleMat;
 mScene.add(maleMesh);
 loader = new GLTFLoader();
    const shirtMat = new THREE.MeshBasicMaterial();
    const shortshirtMat = new THREE.MeshBasicMaterial();
    
    loader.load("3dmodel/ManShirt.glb",(gltf)=>{
        fullSleevShirt = gltf.scene;
        fullSleevShirt.visible=true;
        fullSleevShirt.traverse((child)=>{
             if(child.isMesh){
                shirtMat.color = new THREE.Color(0xffffff);
                child.material=shirtMat;
             }
        })
        fullSleevShirt.scale.set(1.95,1.95,0);
        fullSleevShirt.position.z = .3;
        mScene.add(gltf.scene);
    })
    loader.load("3dmodel/ManShirtshortSleeves.glb",(gltf)=>{
        shortShirt = gltf.scene;
        shortShirt.visible=false;
        shortShirt.scale.set(1.95,1.95,0);
        shortShirt.position.z = .3;
        shortShirt.traverse((child)=>{
             if(child.isMesh){
                shortshirtMat.color = new THREE.Color(0xffffff);
                child.material=shortshirtMat;
             }
        })
        mScene.add(gltf.scene);
    })
}
export const changeTexture=(isFull,tex)=>{
    
     if(isFull){
        fullSleevShirt.traverse((child)=>{
            if(child.isMesh){
                console.log("!!!!!!!!!!!!!!!!!!");
               const texture  = textureLoader.load(tex);
               texture.colorSpace = THREE.SRGBColorSpace;
               child.material.map = texture;
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
                   child.material.map = texture;
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
const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  z-index: -1;
  position: fixed;
`