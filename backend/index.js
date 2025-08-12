const express= require('express');
const cors= require('cors');
require('dotenv').config();
require('./Models/db.js'); 

const signupRouter= require('./Routes/signupRouter.js');
const loginRouter= require('./Routes/loginRouter.js');
const productRouter= require('./Routes/productRouter.js');


const app= express();
const PORT= process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/products",productRouter);


app.listen(PORT, ()=>console.log(`server is running on ${PORT}`));
