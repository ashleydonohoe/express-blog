var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

// Mongoose/Model Config
var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
   res.send("Testing"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running");
});