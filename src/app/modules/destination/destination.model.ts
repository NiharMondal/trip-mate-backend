import { model, Schema } from "mongoose";
import { IDestination } from "./destination.interface";




const destinationSchema = new Schema<IDestination>({
    destination:{
        type: String,
        required: true,
        unique:true
    },
    trips: [
        {
            type: Schema.Types.ObjectId,
            ref: "Trip"
        }
    ]
});


const Destination = model<IDestination>("Destination", destinationSchema)

export default Destination;