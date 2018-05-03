const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");
      
const commentSchema = new mongoose.Schema({
   author: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
   },
   content: String
});

commentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Comment", commentSchema);