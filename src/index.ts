import "reflect-metadata";
import app from "./app";
import {AppDataSource} from "./db";
import dailyUpdate from "./updater";


async function main(){
    try{
        await AppDataSource.initialize();
        console.log("Database connected");
        app.listen(4000);
        //console.log("Server on port", 4000);
    } catch (error){
        console.error(error);
    }
    
}

main();

dailyUpdate();

