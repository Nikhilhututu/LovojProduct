import React from 'react';
import styled from 'styled-components';
import { changeTexture,changeShirt } from './Web3D';
const UI = () => {
    const [isFull,setFull] = React.useState(true);
    const onClickItem=(e,type)=>{
        if(type ==='full')
            setFull(true);
        else    
            setFull(false);
        changeShirt(type==='full'?true:false);
    }
    return (
        <Wrapper>
            <div className='container'>
                <div className={isFull?'active':""}  onClick={(e)=>{
                    onClickItem(e,"full");
                }}>Full Sleeve</div>
                <div className={!isFull?'active':""} onClick={(e)=>{
                    onClickItem(e,"half");
                }}>Half Sleeve</div>
            </div> 
            <input type="file"   accept=".jpg, .jpeg, .png" id="myFile" name="filename" onChange={(e)=>{
                 const url = URL.createObjectURL(e.target.files[0]);
                 changeTexture(isFull,url);
            }}/>
        </Wrapper>
    );
    
};
export default UI;

const Wrapper = styled.div`
    .container{
        display: flex;
        color: aliceblue;
        gap: 1rem;
        padding: 2rem;
        user-select: none;
        div{
            font-size: 1rem;
            color: #F1F6F9;
            padding: .5rem;
            background-color: #212A3E;
            border-radius: 5px;
            border: 1px solid #F1F6F9;
            cursor: pointer;
        }
        .active{
            border: 2px solid #FFF9DE;
        }
    }
    input{
        padding: 2rem ;
        font-size: 1rem;
        cursor: pointer;
        color: aliceblue;
        user-select: none;
    }
    input[type="file"]::file-selector-button {
            border: 2px solid aliceblue;
            padding: .5rem;
            border-radius: 0.2em;
            background-color: #213555;
            transition: 1s;
            color: aliceblue;
        }

`