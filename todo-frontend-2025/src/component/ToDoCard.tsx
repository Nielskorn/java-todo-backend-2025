import {TODO} from "../Type/Todo.ts";
import "./ToDoCard.css"
import axios from "axios";
import {useState} from "react";

type todoProps={
    todo:TODO
}
export default function ToDoCard(todo:todoProps){
//console.log(todo.todo.status)
    let status:string="OPEN"
   const [upIsP,setUpIsP]=useState<boolean>(true);
   const [downIsP,setDownIsP]=useState<boolean>(false);
    function updateStatus(todo:TODO,up:boolean){

        switch( todo.status){
            case 'OPEN':
                if(up){
                    status="IN_PROGRESS"
                    setDownIsP(true)
                    setUpIsP(true)
                }
            break
            case 'CLOSE':
                if(!up){
                    status='IN_PROGRESS'
                    setUpIsP(true)
                    setDownIsP(true)
                }
                break
            case 'IN_PROGRESS':
                if(up){
                    status="CLOSE"
                    setUpIsP(false)
                }
                else {
                  status="OPEN"
                    setDownIsP(false)
                }

                break
             default:
                console.log("if this is visable somrthing wrong")
                break;
        }
    }
    function updateTodo(Todo:TODO){
        axios.put("api/todo/",{
            description: Todo.description,
            id: Todo.id,
            status: status


        })
    }
    return <div className="to-do-card">
        <h2>{todo.todo.description}</h2>
        <p>status: {todo.todo.status}</p>
        <div className="buttbox">
        <button className="butt" disabled={!downIsP}
                onClick={() =>{updateStatus{todo,false}
                updateTodo}>perivios</button>
        <button className="butt" disabled={!upIsP}
                onClick={() => {updateStatus{,false}
        updateTodo{todo.todo}}>next</button>
        </div>
        <></>
    </div>
