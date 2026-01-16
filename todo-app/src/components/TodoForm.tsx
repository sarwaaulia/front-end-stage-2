import React, { useState } from "react";
import { useTodo } from "../hooks/useTodo";

export default function TodoForm() {
	const [text, setText] = useState("");
    const {createTodo, loading} = useTodo()

	const handleSubmit  = (e: React.FormEvent) => {
        e.preventDefault()
        if(!text.trim()) return;
        createTodo(text)
        setText("")
    };

	return (
		<div className="w-full max-w-md mx-auto">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<label htmlFor="task name" className="font-semibold ml-1">Task Name:</label>
				<input
					type="text"
					onChange={(e) => setText(e.target.value)}
					disabled={loading}
					placeholder="add new task"
                    className=" border mb-3"
                    value={text}
				/>
                <button type="submit" disabled={loading}>Add</button>
			</form>
		</div>
	);
}
