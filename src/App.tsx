import { useState } from "react";
import TodoItem from "./components/todoItems";

function App() {
	const data = [
		{ id: 1, name: "belajar react", isCompleted: true },
		{ id: 2, name: "belajar hooks", isCompleted: false },
		{ id: 3, name: "belajar component", isCompleted: false },
	];

	const [todos, setTodos] = useState(data);

	const toggleComplete = (id: any) => {
    setTodos(todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

	return (
		<div style={{textAlign: "center", justifyContent: "center", margin: "25px auto"}}>
			<h1>to do app</h1>
			<ul style={{ padding: 0, marginTop: "20px", listStyle: "none", textAlign: "center", justifyContent: "center"}}>
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} ToggleBtn={toggleComplete} />
				))}
			</ul>
		</div>
	);
}

export default App;
