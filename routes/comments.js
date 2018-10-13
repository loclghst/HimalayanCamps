const express= require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Comments routes

router.get("/new", isLoggedIn, (req, res) =>{
    // find campground by id
    Campground.findById(req.params.id,(err, campground) =>{
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//POST Route for adding comments to the db
router.post("/", isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //Add username and id to the comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save the comment
               comment.save();
               
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});


module.exports = router;