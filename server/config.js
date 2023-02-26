import dotenv from "dotenv";
dotenv.config();

console.log(process.env.Mongo_Admin);
console.log(process.env.Mongo_Password);

const Mongo_Admin = process.env.Mongo_Admin;
const Mongo_Password = process.env.Mongo_Password;

export const MONGODB_URI = `mongodb+srv://${Mongo_Admin}:${Mongo_Password}@cluster0.v7dvde9.mongodb.net/?retryWrites=true&w=majority`;
