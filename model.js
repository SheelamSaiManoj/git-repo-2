
var mongoose = require('mongoose');
  

var foodsSchema = new mongoose.Schema({
	id:String,
	name:String,
	quantity:String,
	expiry_date:String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Food', foodsSchema);
