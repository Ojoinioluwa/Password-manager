require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorhandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/user/userRouter");
const limiter = require("./middlewares/rateLimiter");
const helmet = require('helmet');
const cors = require("cors");
const passwordRouter = require("./routes/password/passwordRoute");
const authorizedUserRouter = require("./routes/authorizedUser/authorizedUserRoute");
const groupRouter = require("./routes/group/groupRoute");


const app = express();
const PORT = process.env.PORT || 8000


// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDb connected successfully")
    })
    .catch((err) => {
        console.log("error connecting to the database")
        console.log(err)
    })

const allowedOrigin =
    process.env.NODE_ENV === 'production'
        ? 'https://password-manager-frontend-mzof.onrender.com/' // replace with your real domain
        : 'http://localhost:5173';

app.use(cors({
    origin: allowedOrigin,
    credentials: true, // allows sending cookies/auth headers
}));



// apply to all routes
app.use(express.json());
app.use(limiter)
app.use(helmet());



// consume the routes
app.use("/api/v1", userRouter)
app.use("/api/v1", passwordRouter)
app.use("/api/v1", authorizedUserRouter)
app.use("/api/v1", groupRouter)



// handle route not found
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});



// consume the errorhandler middleware
app.use(errorhandler)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})