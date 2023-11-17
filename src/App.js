import React from 'react';
import UI from './component/UI';
import Web3D from './component/Web3D';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './component/Home';
import ShirtConfigForm from './component/ShirtConfigForm';
import Config from './component/Config';
const App = () => {
  return (
      <>
         <Router>
           <Routes>
               <Route path='/' element={ <ShirtConfigForm/> }></Route>
               <Route path='/config' element={ <Config/> }></Route>
            </Routes>
         </Router>
      </>
  );
};
export default App;