import { useState,useEffect,useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Shipments from "./pages/Shipments";
import EditShipment from "./pages/EditShipment";
// import {shipments,setShipments} from "./components/Shipments";
const url='/Shipments.txt';
const loadedShipments=await fetch(url)
.then(res=>res.json())
.then(json=>(json));
function App() {
  
  const url='/Shipments.txt';
  const [shipments, setShipments] = useState(loadedShipments);

  useEffect(()=>{
    console.log('useEffect')
    fetch(url)
      .then(res=>res.json())
      .then(json=>setShipments(json))
  },[url]);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="" exact element={ <Navigate to="/shipments" /> } />
        <Route path="/shipments" exact element={ <Shipments shipments={shipments} setShipments={setShipments} /> } />
        <Route path="/shipments/:page" exact element={ <Shipments url={url} shipments={shipments} setShipments={setShipments} /> } />
        <Route path="/shipments/edit/:index" element={ <EditShipment shipments={loadedShipments} setShipments={setShipments} /> } />
      </Routes>
    </div>
  );
}

export default App;
