const mongoose   = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
var connection = mongoose.createConnection(process.env.MONGODB_URI)
autoIncrement.initialize(connection);

var bookSchema = new Schema({
    title: String,
    author:String,
    description:String,
    genre: String,
    isbn:Number,
    publication_date: Date,
    price:Number
});
 
bookSchema.plugin(autoIncrement.plugin, 'Book');
var Book = connection.model('Book', bookSchema);
module.exports = Book;