const express= require("express");
const router= express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware")
//we need nt do /index.js after middleware cause it is understood that index.js is the home file hence we named it index.js and nothing else

router.get("/",(req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("else in /campgrounds")
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    })
});

router.get("/new",middleware.isLoggedIn, (req, res)=>{
    res.render("campgrounds/new");
});

router.get("/:id",(req, res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        console.log(req.params.id);
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});   
        }
    });
})

//edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req, res)=>{
    
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                res.render("campgrounds/edit", {campground:foundCampground});
            }
        })  
})

//update campground route
router.put("/:id",middleware.checkCampgroundOwnership, (req, res)=>{
    //find n update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
    //then redirect somewhere 
});

//destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,(req, res)=>{
Campground.findByIdAndRemove(req.params.id, (err)=>{
    if(err){
        res.redirect("/campgrounds");
    }
    else{
        res.redirect("/campgrounds");
    }
})
})

router.post("/",middleware.isLoggedIn,(req, res)=>{
    
    var name =req.body.name;
    var image= req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author= {
        id: req.user._id,
        username: req.user.username
    }
    var newcampground = {name: name,price: price, image: image,description: desc, author: author};

    Campground.create(newcampground, (err, newcampground)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(newcampground);
            res.redirect("/campgrounds");
        }
    });
    

});


module.exports = router;
