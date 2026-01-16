import { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import type { Todo } from "../types/todo";

export const TodoItem = ({ todo }: { todo: Todo }) => {
	const { updateTodo, deleteTodo, toggleCompleted, loading } = useTodo();

	const [isEditing, setIsEditing] = useState(todo.text);

	const handleUpdate = () => {
        updateTodo(todo.id, text)
        setIsEditing(false)
    };

    const [text, setText] = useState(todo.text);

	return (
		<div className="flex justify-center items-center gap-5 mt-5">
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleCompleted(todo.id)}
			/>

			{isEditing ? (
				<>
					<input
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="border"
						disabled={loading}
					/>
					<button onClick={handleUpdate}>save</button>
				</>
			) : (
				<>
					<span
						style={{ textDecoration: todo.completed ? "line-through" : "none" }}
					>
						{todo.text}
					</span>
					<button onClick={() => setIsEditing(true)} disabled={loading}>
						edit
					</button>
					<button onClick={() => deleteTodo(todo.id)} disabled={loading}>
						delete
					</button>
				</>
			)}
		</div>
	);
};
