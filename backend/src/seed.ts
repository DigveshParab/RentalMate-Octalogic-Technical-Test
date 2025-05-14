import { PrismaClient } from "../generated/prisma";

const pClient = new PrismaClient();

async function main(){
    // adding vehicletypes
    const carTypes = await pClient.vehicleType.createMany({
        data:[
            {type:'Hatchback',wheels:4},
            {type:'SUV',wheels:4},
            {type:'Sedan',wheels:4}
        ]
    })

    const bikeType = await pClient.vehicleType.create({
        data:{type:'Cruiser',wheels:2}
    })

    // adding vehicle data
    await pClient.vehicle.createMany({
        data:[
            {name:"Maruti Alto",vehicleTypeId:1},
            {name:"Hyundai Creta",vehicleTypeId:2},
            {name:"Honda City",vehicleTypeId:3},
            {name:"Royal Enfield",vehicleTypeId:4},
        ]
    })
}

main()
.then(()=>console.log("Seed complete"))
.catch((e)=>console.error(e))
.finally(()=>pClient.$disconnect())

