import { Route, Routes, Navigate} from "react-router-dom"
import Signup from "./pages/signup"
import Login from "./pages/login";
import Home from "./pages/home";
import { useState } from "react";
import { useEffect } from "react";


function App() {

  const [isauth, setisauth]= useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setisauth(true);
    }
  })

  return( 
    <div>
      <nav className="bg-black text-4xl text-white font-bold text-center py-2">Authentication using jwt tokens</nav>

      <div className="flex justify-center items-center min-h-[75vh]">
        <Routes>
          <Route path="/" element={!isauth?<Login setisauth={setisauth}/>: <Navigate to="/home"/> } />
          <Route path="/home" element={isauth? <Home setisauth={setisauth}/>: <Navigate to="/login"/>} />
          <Route path="/login" element={!isauth?<Login setisauth={setisauth}/>: <Navigate to="/home"/> } />
          <Route path="/signup" element={!isauth? <Signup/>: <Navigate to="/home"/>} />
        </Routes>
      </div>
    </div>
  )
  
}

export default App;
