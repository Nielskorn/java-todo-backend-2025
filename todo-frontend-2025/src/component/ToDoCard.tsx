import {TODO} from "../Type/Todo.ts";
import "./ToDoCard.css"
import axios from "axios";
import {useEffect, useState} from "react";



type todoProps={
    todo:TODO,
    fetchData:()=>void
}

export default function ToDoCard(todo:todoProps){
//console.log(todo.todo.status)
    useEffect(()=>initStatus(todo.todo),[])
    let status:string="OPEN"
   const [upIsP,setUpIsP]=useState<boolean>();
   const [downIsP,setDownIsP]=useState<boolean>();
   function  initStatus(todo:TODO){
       switch( todo.status){
           case 'OPEN':
                   setDownIsP(false)
                   setUpIsP(true)

               break
           case 'DONE':
               setUpIsP(false)
               setDownIsP(true)
               break
           case 'IN_PROGRESS':
               setUpIsP(true)
               setDownIsP(true)
               break
           default:
               console.log("if this is visable somrthing wrong")
               break;
       }
   }

    function updateStatus(todo:TODO,up:boolean){

        switch( todo.status){
            case 'OPEN':
                if(up){
                    status="IN_PROGRESS"
                    setDownIsP(true)
                    setUpIsP(true)
                }
                break
            case 'IN_PROGRESS':
                if(up){
                    status="DONE"
                    setUpIsP(false)
                    setDownIsP(true)
                }
                else {
                    status="OPEN"
                    setDownIsP(false)
                }
                break
            case 'DONE':
                if(!up){
                    status='IN_PROGRESS'
                    setUpIsP(true)
                    setDownIsP(true)
                }
                break



            default:
                console.log("if this is visable somrthing wrong")
                break;
        }
    }
    function updateTodo(Todo:TODO,upflag:boolean){
        updateStatus(Todo,upflag)
        axios.put("api/todo/"+Todo.id,{
            description: Todo.description,
            id: Todo.id,
            status: status


        }).then(()=>{
           todo.fetchData();}).catch((error)=>{console.log(error)})
    }





    return (<div className="to-do-card">
        <h2>{todo.todo.description}</h2>
        <p>status: {todo.todo.status}</p>
        <div className="buttbox">
        <button className="butt" disabled={!downIsP}
                onClick={() =>updateTodo(todo.todo,false)}
                >perivios</button>
        <button className="butt" disabled={!upIsP}
                onClick={() => updateTodo(todo.todo,true)}>next</button>
        </div>
            <button onClick={()=>{axios.delete("api/todo/"+todo.todo.id).then(()=>{todo.fetchData()})}}>delete</button>
   </div>
    )
}