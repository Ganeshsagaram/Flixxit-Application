import { MongoClient } from "mongodb";

import dotenv from 'dotenv';
dotenv.config();
export async function dbConnection() {
    const uri="mongodb+srv://ganesh:Venkatsai%401504@myatlasclusteredu.liqdar6.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU"
    const client=new MongoClient(uri);
      const connection=await client.connect();
      return connection;
}
// dbConnection();