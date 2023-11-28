import mongoose from "mongoose"

export function databaseConnection(){
    const params={
        useNewUrlParser:true,useUnifiedTopology:true,
    }
    try {
        mongoose.connect(process.env.DbUrl,params);
        console.log("Db Connection Successful");
    } catch (error) {
        console.log("Error in DB Connection");
        
    }

}