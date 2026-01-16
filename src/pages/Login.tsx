import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const {login} = useAuth()
	const {navigate} = useNavigate()
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		if(username === "admin" && password === "admin"){
			login("ini token")
			navigate("/post")
		} else {
			setError("invalid username or password")
		}
	};

	return (
		<div className="flex justify-center items-center p-4">
			<form onSubmit={handleLogin} className="w-full max-w-sm bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 space-y-6">
				<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">LOGIN FORM</h1>
				<div className="space-y-2">
					<label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-300">username</label> <br />
					<input
						type="text"
						id="username"
						placeholder="enter a username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
                        required
						className="border w-full "
						
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="password">password</label> <br />
					<input
						type="password"
						id="password"
						placeholder="enter a password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
                        required
						className="border w-full "
					/>
				</div>
				{error && (
					<p>{error}</p>
				)}
			<Button type="submit" className="w-full ">Login</Button>
			</form>
		</div>
	)}
	

