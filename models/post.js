const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");
      
const postSchema = new mongoose.Schema({
   content: String,
   image: String,
   title: String,
   author: {
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       username: String
   },
   posts: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
   }]
});

postSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Post", postSchema);