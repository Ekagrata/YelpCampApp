const mongoose = require("mongoose");
const Campground= require("./models/campground");
const Comment= require("./models/comment");

const data = [
    {
        name: "Cloud's Rest",
        image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Desert Maze",
        image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Truind",
        image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, (err)=>{
        if(err){
            console.log(err);
        }
        // else{
        //     console.log("removed campgrounds");
        //     //add few campgrounds
        //     data.forEach((campground)=>{
        //         Campground.create(campground,(err, createdCampground)=>{
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("created a campground");
        //                 Comment.create({
        //                     text: "this place is great but i widh there was internet",
        //                     author: "Homer"
        //                 }, (err, comment)=>{
        //                     if(err){
        //                         console.log(err);
        //                     }
        //                     else{
        //                         createdCampground.comments.push(comment);
        //                         createdCampground.save();
        //                         console.log("created new comment");
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // }
    });
}

module.exports= seedDB;
