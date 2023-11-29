import { Dairy } from "../models/dairy.js";

export function getAllUserDocs(req){
    return Dairy.find({user:req.user._id}).populate( "user","title document date");               

}

