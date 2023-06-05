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
        div{
            font-size: 1.5rem;
            padding: 2rem;
            background-color: #213555;
            border-radius: 10px;
            border: 1px solid aliceblue;
            cursor: pointer;
        }
        .active{
            border: 1px solid yellow;
        }
    }
    input{
        padding: 2rem ;
        font-size: 1.3rem;
        cursor: pointer;
    }
    input[type="file"]::file-selector-button {
            border: 2px solid aliceblue;
            padding: 1.5rem;
            border-radius: 0.2em;
            background-color: #213555;
            transition: 1s;
            color: aliceblue;
        }

`