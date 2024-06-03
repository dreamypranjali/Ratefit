import logo from './logo.svg';
import styles from './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,
Routes,
Route,
Link} from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//So far, we have used this file as the starting of our application, but I want to cretae a nav-bar that will take the user to different parts of the website.
//I want to use the react-bootstrap navbar.
//APIs I want in the nav-bar:
//Seeing all registered stores
//Seeing all the products category wise.
//A link to register a store.
//Login for user/ business.
//Following is not a part of nav-bar.
//A front page of out application where we show a grid of top products and a search bar for searching products.
function App() {
  const [products_list, set_product_list] = useState([]);
  const [search_string, update_search_string] = useState("");

  const fetch_items = (url) => {
  
    axios.get(url).
    then((response) => {
  
    const products = response;
    console.log(products.data);
    console.log(response);
    
    //Create a new list using the spread operator. The square brackets indicate a list curly braces will mean object.
    const new_products_list = [...products_list, products.data];
    //replace the existing list with the new list using set_product_list
    console.log(new_products_list)
    set_product_list(products.data);
    console.log(products_list)})
    
  
  }

  //Make an axios call to get the products from the Mongo backend.
  //I enclosed the axios call in useEffect because I want the component to render only on mount.
  useEffect(()=>{
  
   fetch_items('http://localhost:3001/product/get');
  
  
    

  }, [])

  const view_store_onclick = function view_stores(){
    fetch_items('http://localhost:3001/product/get/search_string');

  }

  //This will cause unnecessary re-renders.
  const search_onchange = function search_handler(e){
  
    update_search_string(e.target.value);
  
  }
  


  return (
    //We are going to enclose the nav bar within router.
    <div>
    <Router>
        <Navbar>
            <Navbar.Brand>
                    <h1 style={{ color: "green" }}>RateFit</h1>
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className = "ml_auto">
                    <Nav.Link as={Link} to="/" exact>
                            Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register" register>
                            Register
                    </Nav.Link>
                    <Nav.Link as={Link} to="/stores" stores>
                            Stores
                    </Nav.Link>

                </Nav>
                </Navbar.Collapse>
        </Navbar>
        <div className="container mt-4">
        <Routes>
            <Route path = "/Stores"/>
        </Routes>
        </div>
    
    </Router>
    <div>
    <form className = "flex-grid">
    
    <input type="text" id="fname" name="fname" className = "input" onChange = {search_onchange}></input>
    <input type="submit" value="Search"></input>
    </form>  
    </div>
    <div className = "bigger-flex-grid">
        
        
            {products_list.map((product) => {
                console.log(product._id)
                return(<div key = {product._id} className = 'fixed-sized-card'><h1>{product.name}</h1>
                <p>{product.Description}</p>
                <button onClick = {view_store_onclick}>View Stores</button>
                </div>)
            })}
            
        
    </div>
    
    
    

        

      
      </div>
  );
}

export default App;
