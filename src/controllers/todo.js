import {Todo} from '../models/todo.js'


const addTodo =async (req, res) => {
  try {
    const todo =await Todo.create({
      content: req.body.content,
      owner: req.user._id
    });
    const createdTodo=await Todo.findById(todo._id);
    if(!createdTodo){
    console.log("Todo not created")
}
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const getTodos= async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id,isCompleted:false });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
const getCompletedTodos= async (req, res) => {
  try {
    const completedtodos = await Todo.find({ owner: req.user._id,isCompleted:true });
    res.json(completedtodos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
const updateTodo=async (req,res)=>{
  const {_id,content}=req.body
  const owner=req.user._id
  try{
    const response=await Todo.findOneAndUpdate({_id:_id,owner:owner},
      {content:content},
      {new:true}
    )
    if (!response) return res.status(404).json({ error: "Todo not found" });
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}

const deleteTodo=async(req,res)=>{
  try{
    const {_id}=req.body
    const owner=req.user._id
    const response=await Todo.findOneAndDelete({_id:_id,owner:owner})
    if(!response) return res.status(404).json({"error":"Todo not found and hence not deleted"})
    res.json({"status":"Todo was successfully deleted"})
  }
catch(err){
  res.status(404).json({"status":"Todo was not deletd"})
}

}

const completeTodo=async(req,res)=>{
  const {_id,isCompleted}=req.body
  const owner=req.user._id
  const response= await Todo.findOneAndUpdate({_id:_id,owner:owner},
    {isCompleted:isCompleted},
    {new:true}
  )
  if(!response) return res.status(404).json({"error":"Operation failed"})
    res.json({"status":"Successful"})
}





export {getTodos, addTodo, updateTodo ,deleteTodo,completeTodo,getCompletedTodos}