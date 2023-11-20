import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import Cards from './Component/Cards';
import Addmovie from './Component/Addmovie';
import DetailMovie from './Component/DetailMovie';
import Login from './Component/Login';
import SignUp from './Component/SignUp';

// Create a context
const AppState = createContext();

const App = () => {
  const [login, setLogin] = useState(false); // Use useState in a functional component
  const [UserName, setUserName] = useState("");



  return (
    <AppState.Provider value={{ login, setLogin, UserName, setUserName }}>
      <div>
        <Header />

        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/AddMovie' element={<Addmovie />} />
          <Route path='/detail/:id' element={<DetailMovie />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}
export { AppState };
export default App;
