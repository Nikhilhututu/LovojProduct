import React from 'react';
import styled from 'styled-components';
import FabricComponent from './FabricComponent';
import * as CONFIG_DATA from '../ConfigData';
import StyleMenu from './StyleMenu';
import { GENDER } from './Home';
const male_options  = ["back","collar","cuffs"];
const female_options= ["length","front","back","sleeves"];
let options;
let selection =0;
const UI = () => {
    const [type,setType] = React.useState(GENDER.type==='male'?male_options[0]:female_options[0]);
    const onClickIcon=(e,index)=>{
        console.log("onClickIcon",index);
        const icons = document.querySelectorAll('.active_img-icons');
        icons.forEach((e,i)=>{
            e.classList.remove('active_img-icons');
        })
        e.target.classList.add('active_img-icons');
        // setType(uiBtn[0]);
        if(GENDER.type === 'male'){
           setMaleType(index);
        }
        else{
           setFeMaleType(index);
        }
       
    }
    const setMaleType = (index)=>{
        switch(index){
            case 0:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.MALE_CHANGE_TYPES.back;
               break;
           case 1:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.MALE_CHANGE_TYPES.collar;
               break;
           case 2:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.MALE_CHANGE_TYPES.cuffs;
               break;
       }
    }
    const setFeMaleType = (index)=>{
        // setType(female_options[index]);
        switch(index){
            case 0:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.FEMALE_CHANGE_TYPES.length;
               break;
           case 1:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.FEMALE_CHANGE_TYPES.front;
               break;
           case 2:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.FEMALE_CHANGE_TYPES.back;
               break;
           case 3:
                CONFIG_DATA.CURRENT.type = CONFIG_DATA.FEMALE_CHANGE_TYPES.sleeves;
               break;
       }
    }
    const showCat = ()=>{
        // console.log(type);
        return <FabricComponent/>
        // switch(type){
        //     case uiBtn[0]:
        //          return <FabricComponent/>
        //     case uiBtn[1]:
        //         //  return  <StyleMenu dataList = {CONFIG_DATA.COLLAR_TYPES}/>
        //         return <FabricComponent/>
        //     case uiBtn[2]:
        //         return <FabricComponent/>
        //     case uiBtn[3]:
        //         return <FabricComponent/>
        // }
    }
    const showMenu=()=>{
        options = GENDER.type === 'male'?male_options:female_options;
        return(
                <div className='container'>
                    {
                        options.map((src,index)=>{
                            return(
                            <div className='icon_container' key={index}>
                                    <div className={'img-icons'} key={index} onClick={(e)=>{
                                        onClickIcon(e,index);
                                    }} >
                                        <img src= {GENDER.type==='male'?`./3dmodel/ui/male/${src}.png`:`./3dmodel/ui/${src}.png`} alt={src} />
                                    </div> 
                            </div>
                            )
                        })
                    }
                </div>
        )
    }
    return (
        <Wrapper>
            {
            //    options = GENDER.type === 'male'?male_options:female_options
            }
            <div className='main_container'>
                {
                    showMenu()
                }
                {
                    showCat()
                } 
            </div>
            
        </Wrapper>
    );
};
export default UI;

const Wrapper = styled.section`
     width: 100%;
     max-width: 100%;
    .main_container{
        width: 100%;
        overflow-x: hidden;
        position: absolute;
        display: block;
        display: flex;
        flex-direction: row-reverse;
        pointer-events: none;
        align-self: flex-end;
    }
    .container{
        padding: 1rem;
        display: flex;
        gap: 1rem;
        user-select: none;
        flex-direction: column;
        pointer-events: all;
        overflow-x: hidden;
        .icon_container{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 1rem;
        }
        .img-icons{
            width: 3rem;
            height: 3rem;
            cursor: pointer;
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
        .active_img-icons{
            transform: scale(1.2);
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