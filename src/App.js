
import { useEffect, useState } from "react";

import { useNavigate} from "react-router-dom";




function App() {
  const navigate = useNavigate()
 

  useEffect(()=>{
    navigate('/login')
  })

 
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
