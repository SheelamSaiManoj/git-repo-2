var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var imgModel = require('./model');

var fs = require('fs');
var path = require('path');
/* require('dotenv/config'); */

MONGO_URL="mongodb://localhost/imagesInMongoApp";
PORT=3000;
mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(express.static("public"));

var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

app.get("/",function(req,res){
	res.render("home-1")
})

app.post('/module', (req, res) => {

	const optionName=req.body.btn;
    if (optionName==="donor"){
        res.render("donor-module")
    }

    if (optionName==="receiver"){
		imgModel.find({}, (err, items) => {
			if (err) {
				console.log(err);
				res.status(500).send('An error occurred', err);
			}
			else {
				res.render('receiver-module', { items: items });
			}
		});
    }
});


app.post('/done', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.render("done")
		}
	});
});

// Step 9 - configure the server's port

var port = process.env.PORT || '3000'
app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})

app.post("/mydonations",function(req,res) {
	res.render("mydonations")
})

app.post("/click",function(req,res){

	const optionName=req.body.btn;
    if (optionName==="food"){
        imgModel.find({}, (err, items) => {
			if (err) {
				console.log(err);
				res.status(500).send('An error occurred', err);
			}
			else {
				res.render('home', { items: items });
			}
		});
    }
})
