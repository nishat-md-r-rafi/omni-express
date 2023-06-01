import express from "express";
const mongoose = require("mongoose");
import router from "./routes/index"

const app = express();

const PORT = 9000 || process.env.PORT 

app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/omni-express';
mongoose.connect(mongoURI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {  console.log("connected to mongoDB")})
.catch((error:any) => {  console.log(error)})
    

app.listen(PORT, () => {  
    console.log("listening on port", PORT)
});

app.use('/', router())