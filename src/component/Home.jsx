import React from 'react';
import styled from 'styled-components';
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
export const GENDER = {type:'male'};
const Home = () => {
    const [gender,setGender] = React.useState(GENDER.type);
    // GENDER.type='male';
    return (
        <Wrapper>
            <div className="main_container">
                <div className=  {gender == 'male'?'grid_icons active':'grid_icons'} onClick={()=>{
                    GENDER.type='male';
                    setGender('male');
                }}>
                     <FaMale className='icons'/>
                </div>
                <div className={gender == 'female'?'grid_icons active':'grid_icons'} onClick={()=>{
                    GENDER.type='female';
                    setGender('female');
                }}>
                     <FaFemale className='icons'/>
                </div>
            </div>            
            <NavLink to={"/config"} className={'nav_link'}>
                <div className='my_btn'>
                    Next
                </div>  
            </NavLink>
            
        </Wrapper>
    );
};
export default Home;
const Wrapper = styled.section`
   margin: 0%;
   padding: 0%;
   box-sizing: border-box;
   user-select: none;
   .main_container{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        place-items: center;
        margin: 20rem auto 0;
        width: 50rem;
        .grid_icons{
            width: 10rem;
            height: 10rem;
            background-color: aliceblue;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            text-align: center;
            cursor: pointer;
            .icons{
                width: 100%;
                height: 100%;
            }
            &:active{
                /* transform: scale(.9); */
            }
        }
        .active{
            border: 5px solid #ba55d3;
        }
       
   }
   .my_btn{
        user-select: none;
        margin: auto;
        padding: 1rem 2rem;
        display: flex;
        font-size: 1.5rem;
        width: fit-content;
        background-color: aqua;
        margin-top: 8rem;
        border-radius: 10px;
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
    @media screen and (max-width:768px){
        .main_container{
            width: 30rem;       
            .grid_icons{
                width: 8rem;
                height: 8rem;
            }
        }
        .my_btn{
            padding: .5rem 1.6rem;
            font-size: 1.5rem;
        }
    }
    @media screen and (max-width:480px){
        .main_container{
            width: 20rem;       
            .grid_icons{
                width: 5rem;
                height: 5rem;
            }
        }

    }
`