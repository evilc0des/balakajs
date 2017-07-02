var mongoose = require('mongoose');
var schema=mongoose.Schema;
var movieSchema=new schema({
   author:{type:schema.Types.ObjectId,ref:'User2'},
   title: String,
   code: String,
   initials: String,
   synopsis: String,
   trailer: String,
   genre: [String],
   cast: [String],
   poster: schema.Types.Mixed,
   banner: schema.Types.Mixed,
   shows:[{
   	t: String,
   	p: String
   }] 
});



var movie=mongoose.model('movies', movieSchema);



module.exports = movie;