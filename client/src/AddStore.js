import {useState} from 'react';
import Axios from 'axios';
import {BrowserRouter as Router,
Routes,
Route,
Link} from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
function AddStore() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const addUser = () => {
  
    Axios.post("http://localhost:3001/add", {storeName: userName, storeType: password})
  
  }
  return (
    <div className="App">
      <input type = "text" className= "input" onChange={(event) => {setUserName(event.target.value)}}/>
      <input type = "password" className="input" onChange = {(event) => {setPassword(event.target.value)}}/>
      <button className="button" onClick={addUser}>Add a store</button>
    </div>
  );
}

export default App;
