const express = require('express');

//We use router when we want to divide the APIs into groups. Like APIs for users, products etc.
const router = express.Router();
module.exports = router;
const product = require('../models/amazonProduct');

//The .json() method is used to convert our API data to JSON format.
router.use(express.json());
router.get('/get', async (req, res) => {

	//res.send("Hello!")
	//We need to get all the products in our MongoDB using this API.
	try{
	//For getting data , we are not required to create a Schema object.
		const product_info = await product.find();
		res.send(product_info);
	}

	//Similar to Java there is an error class and therefore it has an object.
	catch(error){
		res.status(500).json({message: error.message});
	}
});

/*router.get('/get/:search-string',  async(req, res) => {

	const search_product = await product.find({name: search-string});
	res.send(search_product);

});*/
