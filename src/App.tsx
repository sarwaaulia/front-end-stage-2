import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./components/ui/navigation-menu";
import Home from "./pages/home";
import About from "./pages/about";
import Posts from "./pages/posts";
import PostDetail from "./pages/postDetail";

function App() {
	return (
		<BrowserRouter>
			<div className="w-full flex justify-center p-5 item-center">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/">home</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/about">about</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/posts">posts</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/posts" element={<Posts />}>
          			<Route path=":postId" element={<PostDetail />}/>
        		</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
