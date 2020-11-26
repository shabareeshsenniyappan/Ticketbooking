"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seats = exports.customers = void 0;
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
exports.customers = customers;
const seats = mongoose.model('seats', seatsschema);
exports.seats = seats;
exports.default = mongoose;
//# sourceMappingURL=databaseConfig.js.map