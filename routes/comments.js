const express= require("express");
const router= express.Router({mergeParams:true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware")

router.get("/new",middleware.isLoggedIn,(req, res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground:campground});
        }
    })
    
});

//creating comment
router.post("/",middleware.isLoggedIn,(req, res)=>{
    //lookcampground using id
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,(err,commentadded)=>{
                if(err){
                    req.flash("error","Something went Wrong!")
                    console.log(err);
                }
                else{
                    commentadded.author.id = req.user._id;
                    commentadded.author.username = req.user.username;
                    commentadded.save();
                    campground.comments.push(commentadded);
                    campground.save();
                    req.flash("success","Successfully added Comment!")
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
})

//edit comment
router.get("/:comment_id/edit",middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campground_id : req.params.id, comment:foundComment});
        }
    })
    
})
//update comment
router.put("/:comment_id",middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//destroy comment
router.delete("/:comment_id",middleware.checkCommentOwnership, (req, res)=>{
     Comment.findByIdAndRemove(req.params.comment_id,(err,removedComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment Deleted!")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})




module.exports = router;