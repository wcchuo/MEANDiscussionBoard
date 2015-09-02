var mongoose = require('mongoose');
var Name = mongoose.model('Name');
var nameController = {};
var Discussion = mongoose.model('Discussion');
var discussionController = {};
var Answer = mongoose.model('Answer');
var answerController = {};


module.exports = (function() {
   	return {
        main: function(req, res) {
            console.log(session.name)
            res.redirect('/');
        },

        showName: function(req, res) {
            Name.find({}, function(err, results) {
                if(err) {
                    console.log(err);
                } else {
                    res.json(results);
                }
            })
        },

        viewOneName: function(req, res) {
            Name.find({_id:req.params.id}, function(err, results) {
                if(err) {
                    res.send("Error!");
                } else {
                    res.json(results);
                }
            })
        },

        addName: function(req, res) {
              //console.log(session.name);
              var name = new Name({name: req.body.name, name_created_at: Date.now()});
              name.save(function(err) {
                  if(err) {
                      console.log('Something went wrong.');
                res.redirect('/#/users');
                  } else { 
                      console.log('Successfully added a Name: '+req.body.name+'!');
                res.redirect('/#/users');
                  }
            })
        },

        removeName: function(req, res) {
              Name.remove({_id: req.params.id}, function (err, names){
                  console.log('Removed!');
            res.redirect('/#/users');
          })
        },

        showDiscussion: function(req, res) {
            Discussion.find({}, function(err, results) {
                  if(err) {
                    console.log(err);
                  } else {
                    res.json(results);
                  }
            })
        },

        viewOneDiscussion: function(req, res) {
            Discussion.find({_id:req.params.id}, function(err, results) {
                if(err) {
                    res.send("Error!");
                } else {
                    res.json(results);
                }
            })
        },

        addDiscussion: function(req, res) {
              var discussion = new Discussion({discussion_topic: req.body.discussion_topic, discussion_description: req.body.discussion_description, discussion_category: req.body.discussion_category, discussion_created_at: Date.now()});
              discussion.save(function(err) {
                  if(err) {
                      console.log('Something went wrong.');
                res.redirect('/');
                  } else { 
                      console.log('Successfully added a Discussion: '+req.body.discussion_topic+'!');
                res.redirect('/');
                  }
            })
        },

        removeDiscussion: function(req, res) {
              Discussion.remove({_id: req.params.id}, function (err, discussions){
                  console.log('Removed!');
            res.redirect('/#/discussions');
          })
        }       
   	}
})();


