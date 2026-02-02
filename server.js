const express = require("express");
const mongoose = require("mongoose");
const ToDo = require("./model");
const cors = require("cors");

const app = express();
app.use(express.json());
// Middleware
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://@cluster0.lb4dxtr.mongodb.net/test").then
(()=> console.log("database is connected..")).catch (err => console.log(err));


//creating a task
app.post("/create_task", async (req,res)=>{
    const {title,description,completed,priority,dueDate} = req.body;
    try{
        const data = new ToDo({title,description,completed,priority,dueDate});
        await data.save();
        return res.json({
            "message":"task created",
            "task":data
        })
    }
        catch (err){
            console.log(err.message);
        }
    
});

//getting the todo lists
app.get("/get_all_tasks", async (req,res) =>{
    try{
        return res.json( await ToDo.find());
    }
    catch (err) {
        console.log(err.message)
    }
})
// update the stutas
app.put("/update_stutas/:id", async (req,res)=>{
    const {completed} = req.body;
    try{
        await ToDo.findByIdAndUpdate (req.params.id,{completed} , {new: true});
        return res.json({"message":"task stutas updated",
            "data":ToDo
        });

    }
    catch (err) {
        console.log(err.message)
    }
});

//edit task
app.put("/edit_task/:id", async (req,res) => {
    const {title,description,completed,priority,dueDate} = req.body;
    try{
    
        await ToDo.findByIdAndUpdate(req.params.id,{title,description,completed,priority,dueDate}, {new:true});
        return res.json({
            "message":"task updated",
            "task":ToDo
        })
    }
        catch (err){
            console.log(err.message);
        }
    

})
//delete task
app.delete("/delete_task/:id",  async (req,res) =>{
    
    try{
        await ToDo.findByIdAndDelete(req.params.id);
        return res.json({
            "message":"task deleted"
        })
    }
    catch (err) {
        console.log(err.message)
    }
});



app.listen(3000, ()=> console.log("running..."))