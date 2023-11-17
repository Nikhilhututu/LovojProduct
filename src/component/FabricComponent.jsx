import React from 'react';
import styled from 'styled-components';
import {GrGallery} from 'react-icons/gr';
import { FaCloudUploadAlt } from "react-icons/fa";
import { mShirtObj } from './Web3D';
import * as CONFIG_DATA from '../ConfigData';
import { GENDER } from './Home';
const FabricComponent = () => {
    const loadGlbModel=(e)=>{
        if(!mShirtObj && e.target.files.length<1)
            return;
        const url = URL.createObjectURL(e.target.files[0]);
        
       if(GENDER.type ==='male')
            loadMaleGlb(url);
       else 
            loadFemaleGlb(url);
            
           
    }
    const loadMaleGlb=(url)=>{
        switch(CONFIG_DATA.CURRENT.type){
            case CONFIG_DATA.MALE_CHANGE_TYPES.back:
                    mShirtObj.loadMaleModel(url,CONFIG_DATA.MALE_CHANGE_TYPES.back);
                break;
            case CONFIG_DATA.MALE_CHANGE_TYPES.collar:
                    console.log("!! colllar!! ",url);
                    mShirtObj.loadMaleModel(url,CONFIG_DATA.MALE_CHANGE_TYPES.collar);
                break;
            case CONFIG_DATA.MALE_CHANGE_TYPES.cuffs:
                    mShirtObj.loadMaleModel(url,CONFIG_DATA.MALE_CHANGE_TYPES.cuffs);
                break;
            default:
                break;    
        }
    }
    const loadFemaleGlb=(url)=>{
        switch(CONFIG_DATA.CURRENT.type){
            case CONFIG_DATA.FEMALE_CHANGE_TYPES.length:
                    mShirtObj.loadFemaleModel(url,CONFIG_DATA.FEMALE_CHANGE_TYPES.length);
                break;
            case CONFIG_DATA.FEMALE_CHANGE_TYPES.front:
                    mShirtObj.loadFemaleModel(url,CONFIG_DATA.FEMALE_CHANGE_TYPES.front);
                break;
            case CONFIG_DATA.FEMALE_CHANGE_TYPES.back:
                    mShirtObj.loadFemaleModel(url,CONFIG_DATA.FEMALE_CHANGE_TYPES.back);
                break;
            case CONFIG_DATA.FEMALE_CHANGE_TYPES.sleeves:
                    mShirtObj.loadFemaleModel(url,CONFIG_DATA.FEMALE_CHANGE_TYPES.sleeves);
                break;
            default:
                break;    
        }
    }
    const changeTexture =(type,e)=>{
        if(!mShirtObj && e.target.files.length<1)
            return;
        const url = URL.createObjectURL(e.target.files[0]);
        console.log(type,url);
        switch(type){
            case 0:
                    mShirtObj.updateTexture("shirt",url);
                break;
            case 1:
                    mShirtObj.updateTexture("cuffs",url);
                break;
            case 2:
                    mShirtObj.updateTexture("collar",url);
                break;
            default:
                break;    
        }
    }
    const changeColor =(type,e)=>{
        const color = e.target.value;
        if(!mShirtObj)
            return;
        console.log(type,color);
        switch(type){
            case 0:
                    mShirtObj.updateColor("shirt",color);
                break;
            case 1:
                    mShirtObj.updateColor("cuffs",color);
                break;
            case 2:
                    mShirtObj.updateColor("collar",color);
                break;
            default:
                break;    
        }
    }
    return (
        <Wrapper>
             <label className='gallery_icon'>
                <FaCloudUploadAlt className='icon'/>
                {/* <input  name="texture-upload" type="file" accept="image/*" id="my-file" onChange={(e)=>{

                    changeTexture(0,e);
                }}/> */}
                  <input  name="glb-upload" type="file" accept=".glb" id="my-file" onChange={(e)=>{
                     loadGlbModel(e);
                }}/>
             </label>
            {/* <div className="container-color">
                <input type="color" id="color-picker"  defaultValue={"#ffffff"} onChange={(e)=>{
                  changeColor(0,e);
              }}/>
            </div> */}
        </Wrapper>
    );
};

export default FabricComponent;

const Wrapper =styled.div`
     display: flex;
     /* height: 100%; */
     align-items: center;
     padding-top: 1rem;
     gap: 1rem;
     margin-right: 1rem;
     pointer-events: all;
    .gallery_icon{
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        .icon{
            color: #DDE6ED;
            width: 100%;
            height: 100%;
            text-align: center;
        }
        #my-file{
            display:none;
        }
    }
    .container-color {
        border-radius: 4px;
        margin: 0;
        width: 3rem;
        height: 3rem;
    }
    input[type="color"]{
        cursor: pointer;
        border: none;
        background-color: transparent;
        width: 100%;
        height: 100%;
        outline: none;
    }
    #color-picker::-webkit-color-swatch {
        border-radius: 50%;
    }
`

