import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import { bookingSchema, checkAvailabilitySchema } from "../types";

const router =  Router()
const prismaClient = new PrismaClient();

router.post('/create',async(req,res)=>{
    const parseData = bookingSchema.safeParse(req.body)
    if(parseData.success)
    {
        const { firstName, lastName, startDate, endDate, vehicleId } = parseData.data;
    
        try {
                const booking = await prismaClient.booking.create({
                    data:{
                        name:`${firstName} ${lastName}`,
                        vehicleId:vehicleId,
                        startDate:new Date(startDate),
                        endDate:new Date(endDate)
                    }
                })
    
                res.status(200).json({'error':false,'message':"Booking successful"})
    
            } catch (err) {
                console.error("error while booking",err)
                res.status(200).json({'error':true,'message':"error whire booking"})
            }
    }
    else{
        res.status(500).json({'error':true,'message':parseData.error})
    }
})

router.post('/check_availability',async(req,res)=>{
    
        const parseData = checkAvailabilitySchema.safeParse(req.body);

        if(parseData.success)
        {
            const { vehicleId, startDate, endDate } = parseData.data;
            try {
                const overlapping = await prismaClient.booking.findFirst({
                    where:{
                        vehicleId:vehicleId,
                        startDate:{lte:new Date(endDate)},
                        endDate:{gte:new Date(startDate)}
                    }
                })
    
                res.status(200).json({'available':!overlapping})
    
                
            } catch (err) {
                console.log(err)
                res.status(200).json({'error':true,'message':"error whire checking dates"})
            }
        }
        else{
            res.status(500).json({'error':true,'message':parseData.error})
        }

})


router.get('/getTypes/:wheels',async(req,res)=>{
    const wheels = parseInt(req.params.wheels);

    if (isNaN(wheels)) {
        res.status(400).json({ error: true, message: "Invalid 'wheels' parameter" });
        return;
    }

    try {
        const vehTypes = await prismaClient.vehicleType.findMany({
            where:{
                wheels:wheels
            }
        })

        res.status(200).json({ error: false, data: vehTypes });

    } catch (err) {
        console.error("Error fetching vehicle types:", err);
        res.status(200).json({ error: true, message: "Internal server error" });
    }


})

router.get('/getRide/:id',async(req,res)=>{
    const vehId = parseInt(req.params.id);

    if (isNaN(vehId)) {
        res.status(400).json({ error: true, message: "Invalid 'typeId' parameter" });
        return;
    }

    try {
        const vehicleList = await prismaClient.vehicle.findMany({
            where:{vehicleTypeId:vehId}
        })

        res.status(200).json({ error: false, data: vehicleList });

    } catch (err) {
        console.error("Error fetching vehicles:", err);
        res.status(500).json({ error: true, message: "Internal server error" });

    }

})


export default router;

