import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://chavdasharad77:Sharad@cluster0.vbssd.mongodb.net/")
    .then(() => console.log('Connected to MongoDB'))
          .catch((err) => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    password:String,
});

const User = mongoose.model("User",userSchema);

app.post("/newuser", async(req, res) => {
    try{
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch{
        res.status(400).json({error: error.message});
    }
})

app.get("/user", async(req,res) => {
    try{
        const user = await User.find();
        res.json(user);
    } catch{
        res.status(500).json({error: err.message});
    }
})



app.listen(3000);
