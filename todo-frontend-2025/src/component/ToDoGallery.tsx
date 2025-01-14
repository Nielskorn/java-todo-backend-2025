import {TODO} from "../Type/Todo.ts";
import ToDoCard from "./ToDoCard.tsx";
import "./ToDoGallery.css"
export default function ToDoGallery({ todos }:{ todos:TODO[] }){
   const openTodos:TODO[]= todos.filter((todo:TODO)=>todo.status==="OPEN")
    const closeTodos:TODO[]= todos.filter((todo:TODO)=>todo.status==="DONE")
    const inPTodos:TODO[]= todos.filter((todo:TODO)=>todo.status==="IN_PROGRESS")
     const Ocards= openTodos.map((todo:TODO)=><ToDoCard key={todo.id} todo={todo}/>)
    const IPcards=inPTodos.map((todo:TODO)=><ToDoCard key={todo.id} todo={todo}/>)
    const cCards=closeTodos.map((todo:TODO)=><ToDoCard key={todo.id} todo={todo}/>)


return <>
    <div className="todoGala">
    <div>
        <h2>Open</h2>
        {Ocards}
    </div>
    <div>
        <h2>In Progress</h2>
        {IPcards}
    </div>
    <div>
        <h2>Closed</h2>
        {cCards}
    </div>
    </div>
</>
}