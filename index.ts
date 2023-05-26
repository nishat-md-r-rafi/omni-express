import express from "express";

const app = express();

const PORT = 9000 || process.env.PORT 

app.use(express.json());

app.listen(PORT, () => {  
    console.log("listening on port", PORT)
} )