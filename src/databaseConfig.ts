// const MongoClient = require('mongodb').MongoClient;


// //db config
// const MongoURL = "mongodb+srv://demo:0000@cluster0.46um3.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const conn = MongoClient.connect(MongoURL, { useUnifiedTopology: true });

// module.exports = {
//     url: MongoURL,
//     conn
// }

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://demo:0000@cluster0.46um3.mongodb.net/mydb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ticketschema = new Schema({
  name: String,
  gender: String,
  age: String,
  bookingid: String,
  seatno: String,
});

const seatsschema = new Schema({
    seatno: String,
    status: String
  });


const customers = mongoose.model('customers', ticketschema);
const seats = mongoose.model('seats', seatsschema);
export { customers, seats };
export default  mongoose;
// module.exports={mongoose}