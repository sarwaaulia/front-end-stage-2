import { useTodo } from "../hooks/useTodo";
import { TodoItem } from "./TodoItems";

export default function TodoList(){
    const {todos, loading} = useTodo()
    
    return (
        <div className="">
            {loading && 
            <p className="mt-10">loading...</p>}
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </div>
    )
}