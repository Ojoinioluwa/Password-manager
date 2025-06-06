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
// const groupRouter = require("./routes/group/groupROute");

const app = express();
const PORT = process.env.PORT || 8000


// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDb connected succesfully")
    })
    .catch((err) => {
        console.log("error connecting to the database")
        console.log(err)
    })

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
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