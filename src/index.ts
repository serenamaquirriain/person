import "reflect-metadata";
import app from "./app";
import {AppDataSource} from "./db";
import dailyUpdate from "./updater";
import cron from 'node-cron';


async function main(){
    try{
        await AppDataSource.initialize();
        console.log("Database connected");
        app.listen(4000);
        console.log("Server on port", 4000);
        // Runs every day at midnight
        cron.schedule('0 0 * * *', dailyUpdate);
    } catch (error){
        console.error(error);
    }
    
}

main();



