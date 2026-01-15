import React from "react";

function TodoItem({ todo, ToggleBtn }) {
	return (
		<li
			style={{
				display: "flex",
				alignItems: "center",
				gap: "15px",
				marginBottom: "10px",
				listStyle: "none",
			}}
		>
			<span
				style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
			>
				{todo.name}
			</span>

			<button onClick={() => ToggleBtn(todo.id)}>
				{todo.isCompleted ? "Undo" : "Completed"}
			</button>
		</li>
	);
}

export default TodoItem;
