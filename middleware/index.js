const middlewareObj ={};
const Campground = require("../models/campground")
const Comment = require("../models/comment")

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){

        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                req.flash("error","Campground Not Found!")
                res.redirect("back");
            }
            else{
                //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You dont have Permission to do that!")
                    res.redirect("back");
                }
            }
        })
    }
    else{
        req.flash("error","Please Login first!")
       res.redirect("back");
    }
    
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){

        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                console.log(err);
                req.flash("error","Something went Wrong!")
                res.redirect("back");
            }
            else{
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that!")
                    res.redirect("back");
                }
            }
        })
    }
    else{
        req.flash("error","You need to be Logged In to do that!")
       res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!")
    res.redirect("/login");
}

module.exports = middlewareObj;