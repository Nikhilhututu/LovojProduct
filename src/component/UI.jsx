import React from 'react';
import styled from 'styled-components';
import {GrGallery} from 'react-icons/gr';
import { mShirtObj } from './Web3D';

const uiBtn=["shirt","cuffs","collar"];
const UI = () => {
    const [isFull,setFull] = React.useState(true);
    const [type,setType]   = React.useState(0);
    const [isNormalCollar,setCollar] = React.useState(true);
    const onClickShirtType=(type)=>{
        if(type ==='full')
            setFull(true);
        else    
            setFull(false);
        mShirtObj.changeShirt(type==='full'?true:false);
    }
    const onClickCollarType=(type)=>{
        if(type ==='normal')
            setCollar(true);
        else    
            setCollar(false);
        mShirtObj.changeCollar(type==='normal'?true:false);
    }
    // const onClickIcon=(current,id)=>{
    //     const buttons = document.querySelectorAll('.active');
    //     buttons.forEach((e,i)=>{
    //         e.classList.remove('active');
    //     })
    //     current.target.classList.add('active');
    //     document.getElementsByClassName('file-input-container')[0].style.top = 2+id*5.2+"rem";
    //     document.getElementsByClassName('color-input-container')[0].style.top = 2+id*5.2+"rem";
    //     switch(id){
    //         case 0:
    //             onClickShirtType("full");
    //             document.getElementsByClassName('file-input-container')[0].style.display = "block";
    //             document.getElementsByClassName('color-input-container')[0].style.display = "none";
    //             break;
    //         case 1:
    //             onClickShirtType("half");
    //             document.getElementsByClassName('file-input-container')[0].style.display = "block";
    //             document.getElementsByClassName('color-input-container')[0].style.display = "none";
    //             break;
    //         case 2:
    //             onClickCollarType("normal");
    //             document.getElementsByClassName('file-input-container')[0].style.display = "block";
    //             document.getElementsByClassName('color-input-container')[0].style.display = "none";
    //             break;
    //         case 3:
    //             onClickCollarType("stand");
    //             document.getElementsByClassName('file-input-container')[0].style.display = "block";
    //             document.getElementsByClassName('color-input-container')[0].style.display = "none";
    //             break;
    //         case 4:
    //             document.getElementsByClassName('file-input-container')[0].style.display = "none";
    //             document.getElementsByClassName('color-input-container')[0].style.display = "block";
    //             break;
    //         case 5:
    //             document.getElementsByClassName('file-input-container')[0].style.display = "none";
    //             document.getElementsByClassName('color-input-container')[0].style.display = "block";
    //             break;
    //     }
    // }
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
        }
    }
    return (
        <Wrapper>
            <div className='container'>
                {
                    uiBtn.map((src,index)=>{
                         return(
                            <div className='icon_container' key={index}>
                                    <div className={index===0?'img-icons active':'img-icons'} key={index} onClick={(e)=>{
                                            setType(index);
                                    }} >
                                     <img src={`./3dmodel/ui/${src}.png`} alt={src} />
                                    </div> 
                                <label className='gallery_icon'>
                                    <GrGallery className='icon'/>
                                    <input  name="texture-upload" type="file" accept="image/*" id="my-file" onChange={(e)=>{
                                        changeTexture(index,e);
                                    }}/>
                                </label>
                                <div className="container-color">
                                    <input type="color" id="color-picker"  defaultValue={"#ffffff"} onChange={(e)=>{
                                         changeColor(index,e);
                                    }}/>
                                </div>
                            </div>
                          )
                     })
                }
         </div> 
          {/* <div className='container2'>
             <div className='file-input-container'>
                    <input  className='file-input' type="file" accept=".jpg, .jpeg, .png" id="my-file" name="shirt_name" onChange={(e)=>{
                        const url = URL.createObjectURL(e.target.files[0]);
                        switch(type){
                            case 0:case 1:
                                // console.log("%%%%%%%")
                                    mShirtObj.changeShirtTexture(isFull,url);
                                break;
                            case 2:case 3:
                                    mShirtObj.changeCollarTexture(url);
                                break;
                        }
                        
                    }}/>
                    <label className='input-label' htmlFor="my-file" >upload</label>
             </div>
             <div className='color-input-container'>
                    <input  className='color-input' type='color'  id="color-pick" name="color-change" onChange={(e)=>{
                        switch(type){
                            case 4: 
                                mShirtObj.changeButtonColor(e.target.value,"button");
                                break;    
                            case 5:
                                mShirtObj.changeButtonColor(e.target.value,"thread");
                                break;    
                        }
                    }}/>
                    <label className='input-label' htmlFor="color-pick" >Color</label>
             </div>
         </div> */}
        </Wrapper>
    );
    
};
export default UI;
const Wrapper = styled.section`
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    pointer-events: none;
    .container{
        display: flex;
        gap: 1rem;
        padding: 1rem;
        user-select: none;
        flex-direction: column;
        pointer-events: all;
        .icon_container{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 1rem;
        }
        .img-icons{
            width: 3rem;
            height: 3rem;
            cursor: none;
            /* outline: #213555 solid; */
            img{
                padding: 0%;
                margin: 0%;
                width: 100%;
                height: 100%;
                border-radius: 5px;
                text-align: center;
            }
        }
        .active{
            /* outline: aliceblue solid; */
        }
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
            margin: auto 0;
            width: 3rem;
            height: 3rem;
        }
        input[type="color"] {
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
    }
    .container2{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        margin-top: 1.5rem;
        pointer-events: all;
        gap: 2rem;
        .file-input-container{
            position: absolute;     
            right: 6rem;
            top: 2rem;
            .file-input{
                width: 0;
                height: 0;
                padding: 0%;
                margin: 0%;
                overflow: hidden;
            }
            transition: all linear .3s;
        }
        .color-input-container{
            position: absolute;     
            right: 6rem;
            top: 2rem;
            display: none;
            .color-input{
                width: 4rem;
                height: 2rem;
                margin-right: .5rem;
            }
            transition: all linear .3s;
        }
        .input-label{
            padding: .5rem 1.5rem;
            font-size: 1.2rem;
            user-select: none;
            background-color:#213555;
            color: aliceblue;
            border-radius: 10px;
            cursor: pointer;
            display: inline-block;
            text-transform: capitalize;
            transition: all .4s;
            outline: 1px solid #DDE6ED;
            &:hover{
                background-color:#DDE6ED;
                color:#213555;
            }
        }
    }
`