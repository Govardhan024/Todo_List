import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./TodoList.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function TodoList() {

    let [todos, settodos] = useState([{ task: "tasks", id: uuidv4(), isDone: false }]);
    let [newTodo, setnewTodo] = useState("");

    let addNewTask = () => {
        settodos((prevtodos) => [...prevtodos, { task: newTodo, id: uuidv4(), isDone: false }]);
        setnewTodo("");
    };

    let updateTodoVal = (event) => {
        setnewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        settodos((prevtodos) => prevtodos.filter((todo) => todo.id != id));
    };


    let doneTask = (id) => {
        settodos((prevtodos) =>
            prevtodos.map((todo) => {
                if (todo.id == id) {
                    return {
                        ...todo,
                        isDone: true,
                    }
                }
                else {
                    return todo;
                }
            })


        )
    }


    return (
        <div className="outer">
            <TextField id="input" label="Add a Task" variant="outlined" value={newTodo} onChange={updateTodoVal} />
            {/* <input type="text" name="" id="input" placeholder="Add a task" value={newTodo} onChange={updateTodoVal} /> */}
            <br /><br />
            <Button variant="contained" onClick={addNewTask}>Add</Button>
            {/* <button className="btn" onClick={addNewTask}>add</button> */}
            <br /><br />
            <hr />

            <div className="card">
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea style={{}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tasks todo
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <ul className="list">
                                    {todos.map((todo) => (
                                        <li  style ={{marginTop:10}}key={todo.id}><span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>{todo.task}</span>
                                        
                                            <Button style={{ marginLeft: 10}} variant="outlined" color="error" size="small" onClick={() => deleteTodo(todo.id)}>
                                                Delete
                                            </Button>

                                            <Button style={{marginLeft:10}} variant="contained" size="small" onClick={() => doneTask(todo.id)}>
                                                Done
                                            </Button>

                                               

                                            

                                        </li>
                                    ))}
                                </ul>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>



        </div>
    );
}