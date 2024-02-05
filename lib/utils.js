import mongoose from "mongoose";

const connection = {};

export const connectToDB = async () => {
  // try{
  //     if(connection.isConnected){
  //         console.log("Using existing connection");
  //         console.log(mongoose.connection.readyState);
  //         return;
  //     }
  //     const db = await mongoose.connect(process.env.MONGO);
  //     connection.isConnected = db.connections[0].readyState;
  //     console.log(mongoose.connection.readyState);
  // }catch(err){
  //     console.log(err)
  //     // throw new Error(err);
  // }
};

export const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
};
