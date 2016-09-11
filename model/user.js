var mongoose = require('mongoose');
var schema=mongoose.Schema;
var userSchema=new schema({
   user: {
      type:String,
      required: true,
      unique: true
  },
   password: {
      type:String,
      required: true
  }
});



var movie=mongoose.model('user', userSchema);



module.exports = movie;