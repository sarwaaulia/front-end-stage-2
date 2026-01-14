import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function Posts() {
  const posts = [
    { id: 1, name: "Post 1" },
    { id: 2, name: "Post 2" },
    { id: 3, name: "Post 3" },
  ];

  return (
    <div className="p-6">
      {/* Grid List Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{post.name}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/posts/${post.id}`}>Detail</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-10 pt-10 border-t">
        <Outlet />
      </div>
    </div>
  );
}