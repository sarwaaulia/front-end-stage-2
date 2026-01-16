import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/ui/darkMode";
import { ShoppingCart } from "lucide-react";

export default function Header() {
	const { token, logout } = useAuth();

	return (
			<div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
				<NavigationMenu className="container mx-auto flex h-16 items-center px-4 gap-5">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/">Home</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/products">Products</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
					<NavigationMenuList>
						{token && (
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link to="/dashboard">Dashboard</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						)}
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								{token ? (
									<Button onClick={logout} variant="destructive">
										Logout
									</Button>
								) : (
									<Button asChild variant="outline">
										<Link to="/login">Login</Link>
									</Button>
								)}
							</NavigationMenuLink>
						</NavigationMenuItem>
						<DarkModeToggle />
						<Link to="/cart" className="relative group p-2">
                        <ShoppingCart className="h-6 w-6 transition-colors group-hover:text-primary" />
						</Link>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
	);
}
