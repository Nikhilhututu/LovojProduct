import React from 'react';
import styled from 'styled-components';
import * as CONFIG_DATA from '../ConfigData';
import { mShirtObj } from './Web3D';
const handleStyleMenu = (item)=>{
     if(!mShirtObj)
        return;
    //  switch(CONFIG_DATA.CURRENT.type){
    //      case CONFIG_DATA.CHANGE_TYPES.collar:
    //         mShirtObj.loadModel(`3dmodel/collar/${item}.glb`,CONFIG_DATA.CHANGE_TYPES.collar);
    //        break;
    //     default:
    //        break;  
    //  }
}
const StyleMenu = ({dataList}) => {
    return (
        <Wrapper>
             <div className='item_container'>
             {
                 Object.keys(dataList).map((item,i)=>{
                     console.log(item);
                    return <div className='item_container_item' key={i}  onClick={(e)=>{
                        handleStyleMenu(item);
                       }}>
                      {item}
                    </div>
                })
             }
             </div>
        </Wrapper>
    );
};
export default StyleMenu;
const Wrapper = styled.div`
     display: block;
     height: 100%;
     padding-top: 1rem;
    .item_container{
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        gap: 1rem;
        text-align: center;
        user-select: none;
        pointer-events: all;
     }
     .item_container_item{
        cursor: pointer;
        font-size: 1rem;
        width:5rem;
        height: 2rem;
        padding: .5rem;
        height: auto;
        background-color: aliceblue;
        text-transform: capitalize;
        border-radius: .5rem;
        &:active{
            transform: scale(.9);
        }
     }
        
`