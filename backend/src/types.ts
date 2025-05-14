import {z} from 'zod'


export const bookingSchema = z.object({
    firstName:z.string().min(1,"First Name is required"),
    lastName:z.string().min(1,"Last name is required"),
    startDate:z.string().refine((val)=>!isNaN(Date.parse(val)),{message:"Invalid start date"}),
    endDate:z.string().refine((val)=>!isNaN(Date.parse(val)),{message:"Invalid end date"}),
    vehicleId:z.number().int().positive("Vehicle ID must be a positive integer")
})


export const checkAvailabilitySchema = z.object({
  vehicleId: z.number({
    required_error: "Vehicle ID is required",
    invalid_type_error: "Vehicle ID must be a number",
  }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {message: "Start date must be a valid date string"}),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {message: "End date must be a valid date string"}),
});
