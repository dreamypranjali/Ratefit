const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({

	storeName:{
		type: String,
		required: true,
	},
	storeType:{
		type: String,
		required: true,
	},

})

const store = mongoose.model("Stores", storeSchema);
module.exports = store;