import React from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt } from "react-icons/fa";
import * as CONFIG_DATA from '../ConfigData';
import { GENDER } from './Home';
import { useNavigate } from 'react-router-dom';

const updateName=(div,value)=>{
     if( value && value.name.length>0)
      div.textContent = value.name;
}
const ShirtConfigForm = () => {
     React.useEffect(()=>{
        updateName(document.getElementById("shirt_back_id"),CONFIG_DATA.ShirtData.back_model);
        updateName(document.getElementById("shirt_collar_id"),CONFIG_DATA.ShirtData.collar_model);
        updateName(document.getElementById("shirt_cuff_id"),CONFIG_DATA.ShirtData.cuff_model);
        
     },[])

    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const check = CONFIG_DATA.ShirtData.back_model.url.length>0 && CONFIG_DATA.ShirtData.cuff_model.url.length>0 && CONFIG_DATA.ShirtData.collar_model.url.length>0;
        if(!check){
             document.getElementById("error_popup").style.opacity=1;
             const tout = setTimeout(() => {
                document.getElementById("error_popup").style.opacity=0;
                clearTimeout(tout);
             }, 2000);
        }
        else{
            GENDER.type = "male";
            navigate('/config');
        }

    }
    return (
        <Wrapper>
                <h1>Shirt Style</h1>
                <div className='form_container'>
                     <h2>Add 3d models</h2> 
                     <form action="#" className='shirt_form' onSubmit={(e)=>handleSubmit(e)}>
                           <div className='shirt_form_field'>
                               <div className='field_icons'>
                                    <img src="./ui/icons/shirt_back.png" alt="back_model"/>  
                                    <label>Shirt Back</label>
                                </div>  
                              <label className='upload_icon'>
                                <FaCloudUploadAlt className='icon'/>
                                   <input   name="shirt_back_glb" type="file" accept=".glb" id="my-file" onChange={(e)=>{  
                                        const url = URL.createObjectURL(e.target.files[0]);
                                        CONFIG_DATA.ShirtData.back_model.url = url;
                                        CONFIG_DATA.ShirtData.back_model.name = e.target.files[0].name;
                                        document.getElementById("shirt_back_id").textContent = e.target.files[0].name;
                               }}/>
                               <label className='file_name' id='shirt_back_id' htmlFor="back_name"></label>
                            </label>
                          </div>
                          <div className='shirt_form_field'>
                               <div className='field_icons'>
                                    <img src="./ui/icons/shirt_collar.png" alt="back_model"/>  
                                    <label>Shirt Collar</label>
                                </div>  
                              <label className='upload_icon'>
                                <FaCloudUploadAlt className='icon'/>
                                   <input  name="shirt_collar_glb" type="file" accept=".glb" id="my-file" onChange={(e)=>{                                    
                                    const url = URL.createObjectURL(e.target.files[0]);
                                    CONFIG_DATA.ShirtData.collar_model.url = url;
                                    CONFIG_DATA.ShirtData.collar_model.name = e.target.files[0].name;
                                    document.getElementById("shirt_collar_id").textContent = e.target.files[0].name;
                               }}/>
                               <label className='file_name' id='shirt_collar_id' htmlFor="collar_name"></label>
                            </label>
                          </div>
                          <div className='shirt_form_field'>
                               <div className='field_icons'>
                                    <img src="./ui/icons/shirt_cuff.png" alt="back_model"/>  
                                    <label>Shirt Cuff</label>
                                </div>  
                              <label className='upload_icon'>
                                <FaCloudUploadAlt className='icon'/>
                                   <input   name="shirt_cuff" type="file" accept=".glb" id="my-file" onChange={(e)=>{                                    
                                    const url = URL.createObjectURL(e.target.files[0]);
                                    CONFIG_DATA.ShirtData.cuff_model.url = url;
                                    CONFIG_DATA.ShirtData.cuff_model.name = e.target.files[0].name;
                                    document.getElementById("shirt_cuff_id").textContent = e.target.files[0].name;
                               }}/>
                                <label className='file_name' id='shirt_cuff_id' htmlFor="cuff_name"></label>
                            </label>
                          </div>
                          <input type="submit" value="Submit" onClick={()=>{
                          }}/>
                         <div className='error_popup' id='error_popup'>
                              <h2>Please Upload all files!</h2>
                         </div>
                     </form>
                </div>
        </Wrapper>
    );
};

export default ShirtConfigForm;

const Wrapper = styled.section`
     margin: 0%;
     padding: 0%;
     box-sizing: border-box;
     display: block;
    h1{
         text-transform: capitalize;
         text-align: center;
         font-size: 3rem;
         margin: 0%;
         padding: 0%;
     }
     .form_container{
        display: grid;
        place-items: center;
        h2{
            font-size: 1.5rem;
            text-transform: capitalize;
        }
    .shirt_form{
        position : relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        padding: 2rem 2rem;
        input[type="submit"]{
            padding: .5rem 1rem;
            outline: 0;
            border: 0;
            background-color: #422AFC;
            border-radius: 5px;
            color: white;
            font-size: 1rem;
            transition: all linear .2s;
            margin-top : 2rem;
            text-transform: capitalize;
            cursor: pointer;
            &:active{
                transform: scale(.9);
            }
        }
     }
     .shirt_form_field{
        display: flex;
        align-items: center;
        gap: 10rem;
        .field_icons{
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            display: flex;
            align-items: center;
            flex-direction: column;
            label{
                font-size: .8rem;
            }
            img{
                width: 5rem;
                height: 4rem;
                object-fit: contain;
            }   
        }
     }
     .upload_icon{
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .2rem;
        .icon{
           color: #000;
           width: 100%;
           min-width: 100%;
           height: 100%;
           min-height: 100%;
           text-align: center;
        }
        #my-file{
           display:none;
        }
        .file_name{
            font-size: .5rem;
        }
    }
    .error_popup{
        opacity: 0;
        /* position: absolute; */
        user-select: none;
        border:2px solid #FFCC00;
        padding: .5rem 2rem;
        display: inline-block;
        bottom: 0%;
        h2{
            font-size: 1rem;
            padding: 0%;
            margin: 0%;
         }
        transition: all linear .25s;
      }
   }
   @media screen and (max-width:768px){
        .shirt_form{
            .shirt_form_field{
                gap: 5rem;
            }   
        }
   }
`