/* eslint-disable no-console */
import { Server } from "http"
import mongoose from 'mongoose'
import app from "./app"
import { envVars } from "./app/config/env"
let server: Server



const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)

        console.log('connected to DB');
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
startServer()



/* 
unhandled rejection error
uncaught rejection error
signal termination sigterm
*/

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected... Server shutting down....", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1)
})

// Promise.reject(new Error("I forgot to catch this promise"))

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down....", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1)
})

// throw new Error("I forgot to handle this local error ")

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received... Server shutting down....");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1)
})

