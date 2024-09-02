import express from "express";
import path from "path"; // Import path module
import { connectDb } from "./src/db/connectDb.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

import userRoute from "./src/routes/user.route.js";

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/portfolio')));  // Assuming 'client/build' is the folder where React app is built

// API routes
app.use("/user", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    if (err.name === "CastError") err.message = "Invalid ID";
    res.status(statusCode).json({
        success: false,
        message: err.message
    });
});

// Catch-all handler to return `index.html` for any request not handled above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/portfolio/index.html'));
});

// Start the server
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("App is listening on port " + process.env.PORT);
    });
}).catch((err) => {
    console.log(err);
});
