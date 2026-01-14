import { useParams } from "react-router-dom"

export default function PostDetail(){
    const {postId} = useParams()

    return (
        <>
        <h1 className="text-center mt-6">this is post ID: <span>{postId}</span></h1>
        </>
    )
}