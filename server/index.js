const express = require('express');
const app =	express();
const mongoose = require('mongoose');

const {amazon} = require('./scraper');
const cors = require('cors');
const product_routes = require('./routes/products');
//Assign the APIs in product_routes to /product


app.use(express.json());
app.use(cors({origin: true}));
app.use('/product', product_routes);

mongoose.connect('mongodb+srv://pranjali4ever:Lalit6113@cluster0.wlmw4gp.mongodb.net/RateChecker?retryWrites=true&w=majority', {
	
	useNewUrlParser: true
});
console.log("connected to DB");

const scrape = () =>{
    console.log('Running amazon');
    amazon();
}


app.listen(3001, () =>{
	console.log("Server started");
	scrape();
});
