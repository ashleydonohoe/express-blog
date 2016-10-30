// App Config
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override")
    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-0.3.5&q=80&fm=jpg",
//     body: "This is a test post"
// })

// Routes
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
       if(err) {
           console.log("Error!");
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});

app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

app.post("/blogs", function(req, res) {
   // create
   Blog.create(req.body.blog, function(err, newBlog) {
       if(err) {
           res.render("new");
       } else {
           res.redirect("/blogs");
       }
   });
});

// Show Route
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
      if(err) {
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
   });
});

// Edit Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
       if(err) {
           res.redirect("/blogs")
       } else {
            res.render("edit", {blog: foundBlog}); 
       }
    });
});

// Update route
app.put("/blogs/:id", function(req, res) {
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
      if(err) {
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// Delete route
app.delete("/blogs/:id", function(req, res){
   res.send("DELETE"); 
});

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running");
});