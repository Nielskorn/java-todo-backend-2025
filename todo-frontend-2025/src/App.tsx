import {FormEvent, useEffect, useState} from 'react'

import './App.css'
import ToDoCard from "./component/ToDoCard.tsx";
import {TODO} from "./Type/Todo.ts";
import {Simulate} from "react-dom/test-utils";
import axios from "axios"
import error = Simulate.error;

function App() {
    const [data,setData]=useState<TODO[]>([])
    const [description,setDescription]=useState<string>("")
function fetchData(){
    axios.get("/api/todo").then(response=>{setData(response.data)}).catch(error=>console.log(error))
}
    useEffect(() => {
        fetchData()
    }, [])
    function onSubmit(event:FormEvent<HTMLFormElement> ){
    event.preventDefault();
    axios.post("/api/todo",{description:description, status:"OPEN"}).then((value)=>console.log(value.data)).catch(error=>console.log(error))
    }
const cards= data.map((todo:TODO)=><ToDoCard key={todo.id} todo={todo}/>)
  return (
    <>
        <header><h1>Todos</h1>
        <form onSubmit={onSubmit}>
            <input type={"text"} onChange={event => setDescription(event.target.value)} />
            <button type={"submit"} >create</button>
        </form>

        </header>
        <body>
        {cards}
        </body>


    </>
  )

}

export default App
