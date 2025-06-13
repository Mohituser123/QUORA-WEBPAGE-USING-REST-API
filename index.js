const express = require("express");
const app = express();
const port = 8080;
const path = require("path");// to use other folders through index.js file
const {v4: uuidv4}=require('uuid');// require ya use karna after installation
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));
app.set("view engine", " ejs");
app.set("views", path.join(__dirname,"views"));// set path for views
app.use(express.static( path.join(__dirname,"public")));
let posts = [ //post ka data
    {
        id: uuidv4(),
        username : "apnacollege",
        content : " i love coding"
    },
    {
        id: uuidv4(),
        username : "mohitcollege",
        content : "coding is done well"
    },
    {
        id: uuidv4(),
        username : "om college",
        content : " i  coding"
    },
]; 
app.get("/posts", (req,res)=>{ //created route  for render file
    res.render("index.ejs",{ posts});
});
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");

});
app.post("/posts",(req,res) =>{
    let {username,content} = req.body;
    posts.push({id: uuidv4(),username,content});
    res.redirect("/posts");   // connecting each other post
});

app.get("/posts",(req,res) =>{ //thisbis called route 
    let {username,content} = req.body;
    let id= uuidv4();
    post.push({id,username,content});
    res.redirect("/posts")
});
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send("Post not found");
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newcontent= req.body.content;
    let post= posts.find((p)=>id ===p.id);
    post.content=newcontent;
    console.log(newcontent);
    res.redirect("/posts");//page ko submit karne ke baad first ya jo page pe wapas jana hai waha redirect kar dega
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post= posts.find((p)=>id ===p.id);
    res.render("edit.ejs",{post});

})
app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;// delete route ka kaam hai ki searching button with help of id and then after clicking we get response as delete succes
    posts= posts.filter((p)=>id !==p.id);
    
    res.redirect("/posts");
    //res.send("delete success"); //respose is shown after clicking delete button
})
app.listen(port,()=>{
    console.log(" listening to port : 8080");
});
