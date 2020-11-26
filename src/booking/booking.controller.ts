import { Body, Controller,Get, Param, Post, Query } from '@nestjs/common'; 
import { get } from 'http';
const {customers,seats } = require('../databaseConfig');
import mongoose from  '../databaseConfig';

@Controller('booking')
export class BookingController {
  
  
@Post('ticketstatus')
  async ticketstatus( @Body('seatno') seatno : string, ) {

    console.log(seatno);
    var check = await  customers.findOne({seatno : seatno}).exec();
    console.log(check);
    if(check !=null){return("Booking Confirm on SeatNo : "+seatno);}
    else{ return("No Booking available");}
  }

@Post('bookticket')
  async bookticket(@Body('name') name : string,@Body('gender') gender : string,@Body('age') age : string,@Body('seatno') seatno : string, ) {
    if(parseInt(seatno) < 1 || parseInt(seatno) > 40) return(" !! SORRY !! \nSeatnumbers available between 1 - 40");
        else{
           
            var check =await customers.findOne({seatno : seatno}).exec();
            var count=await customers.count();
        
            if(check !=null) {return("Sorry Seat NO : "+seatno+" already booked");}

            else{
                    const myobj = new customers({ name: name, gender: gender ,age: age,bookingid : count+1,seatno : seatno});
              
                    await seats.findOneAndUpdate({ seatno : seatno }, { $set: {status:"close" } });
                   myobj.save((err, res) => {
                    if (err) throw err;
                    });
                    return("Ticket booked succesfully !! \n seatno : "+seatno+"\nbookingid : "+(count+1));
                }
        }
}

@Post('details')
  async details (@Body ('seatno') seatno : string, )
  {
    
        var check= await customers.findOne({seatno : seatno}).exec();
        if(check != null){return (check);}
        else{return (" Seat yet to book !!");}
  } 

  @Post('reset')
  async reset () 
  {
    await customers.deleteMany({});
    await seats.updateMany({status : "close"},{$set: {status: "open"}}).exec();
    return("!! Seats are ready for next trip !!");
  }
   

  @Post('open')
  async  open () {
    var check = await  seats.find({ status:'open'}).exec();  
    return (check);
  } 

  @Post('close')
  async close () {
    var check = await seats.find({ status:'close'}).exec();
    return(check);
  } 
}


