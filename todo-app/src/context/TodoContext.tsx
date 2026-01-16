import { createContext } from "react";
import type { Todo } from "../types/todo";

export type TodoContextType = {
    todos: Todo[]
    createTodo: (text: string) => void
    updateTodo: (id: number, text: string) => void
    deleteTodo: (id: number) => void
    loading: boolean
    toggleCompleted: (id: number) => void
}
export const TodoContext = createContext<TodoContextType | undefined>()