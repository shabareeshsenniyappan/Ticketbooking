import { Controller,Get, Param, Post, Query } from '@nestjs/common'; 
const {customers,seats } = require('../databaseConfig');
import mongoose from  '../databaseConfig';
@Controller('booking')
export class BookingController {
@Post('ticketstatus')
  async ticketstatus(@Query('seatno') seatno : string, ) {

    
    var check = await  customers.findOne({seatno : seatno}).exec();
    console.log(check);
    if(check !=null){
       return("Booking Confirm on SeatNo : "+seatno);
    }
    else{
        return("No Booking available");
    }
  }

@Post('bookticket')
  async bookticket(@Query('name') name : string,@Query('gender') gender : string,@Query('age') age : string,@Query('seatno') seatno : string, ) {
    if(parseInt(seatno) < 1 || parseInt(seatno) > 40) return(" !! SORRY !! \nSeatnumbers available between 1 - 40");
        else{
           
            var check =await customers.findOne({seatno : seatno}).exec();
            var count=await customers.count();
        
            if(check !=null) return("Sorry Seat NO : "+seatno+" already booked");

            else{
                    const myobj = new customers({ name: name, gender: gender ,age: age,bookingid : count+1,seatno : seatno});
                    const myquery = { seatno : seatno };
                    const newvalues = { $set: {status:"close" } };
                    seats.updateOne(myquery, newvalues);
                   myobj.save((err, res) => {
                    if (err) throw err;
                    });
                    return("Ticket booked succesfully !! \n seatno : "+seatno+"\nbookingid : "+(count+1));
                }
        }
}

@Post('details')
  async details (@Query('seatno') seatno : string, )
  {
    
        var check= await customers.findOne({seatno : seatno}).exec();
        if(check != null)
        {
            return (check);
        }
        else
        {
            return (" Seat yet to book !!");
        }
  } 

  @Get('reset')
  async reset () 
  {
    customers.deleteMany({});
    var query = {status : "close"};
    var newvalues ={$set: {status: "open"}};
    await seats.updateMany(query,newvalues).exec();
    return("!! Seats are ready for next trip !!");
  }
   

  @Get('open')
  async  open () {
    var check = await  seats.find({ status:'open'}).exec();  
    return (check);
  } 

  @Get('close')
  async close () {
    var check = await seats.find({ status:'close'}).exec();
    return(check);
  } 
}


