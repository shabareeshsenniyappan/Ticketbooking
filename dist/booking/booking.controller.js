"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const { customers, seats } = require('../databaseConfig');
let BookingController = class BookingController {
    async ticketstatus(seatno) {
        var check = await customers.findOne({ seatno: seatno }).exec();
        console.log(check);
        if (check != null) {
            return ("Booking Confirm on SeatNo : " + seatno);
        }
        else {
            return ("No Booking available");
        }
    }
    async bookticket(name, gender, age, seatno) {
        if (parseInt(seatno) < 1 || parseInt(seatno) > 40)
            return (" !! SORRY !! \nSeatnumbers available between 1 - 40");
        else {
            var check = await customers.findOne({ seatno: seatno }).exec();
            var count = await customers.count();
            if (check != null)
                return ("Sorry Seat NO : " + seatno + " already booked");
            else {
                const myobj = new customers({ name: name, gender: gender, age: age, bookingid: count + 1, seatno: seatno });
                const myquery = { seatno: seatno };
                const newvalues = { $set: { status: "close" } };
                seats.updateOne(myquery, newvalues);
                myobj.save((err, res) => {
                    if (err)
                        throw err;
                });
                return ("Ticket booked succesfully !! \n seatno : " + seatno + "\nbookingid : " + (count + 1));
            }
        }
    }
    async details(seatno) {
        var check = await customers.findOne({ seatno: seatno }).exec();
        if (check != null) {
            return (check);
        }
        else {
            return (" Seat yet to book !!");
        }
    }
    async reset() {
        customers.deleteMany({});
        var query = { status: "close" };
        var newvalues = { $set: { status: "open" } };
        await seats.updateMany(query, newvalues).exec();
        return ("!! Seats are ready for next trip !!");
    }
    async open() {
        var check = await seats.find({ status: 'open' }).exec();
        return (check);
    }
    async close() {
        var check = await seats.find({ status: 'close' }).exec();
        return (check);
    }
};
__decorate([
    common_1.Post('ticketstatus'),
    __param(0, common_1.Query('seatno')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "ticketstatus", null);
__decorate([
    common_1.Post('bookticket'),
    __param(0, common_1.Query('name')), __param(1, common_1.Query('gender')), __param(2, common_1.Query('age')), __param(3, common_1.Query('seatno')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "bookticket", null);
__decorate([
    common_1.Post('details'),
    __param(0, common_1.Query('seatno')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "details", null);
__decorate([
    common_1.Get('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "reset", null);
__decorate([
    common_1.Get('open'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "open", null);
__decorate([
    common_1.Get('close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "close", null);
BookingController = __decorate([
    common_1.Controller('booking')
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map