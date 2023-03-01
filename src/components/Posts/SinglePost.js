import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Posts.css"

    // const localRainbowUser = localStorage.getItem("rainbow_user")
    // const rainbowUserObject = JSON.parse(localRainbowUser)

export const SinglePost = () => {
    const [post, setPost] = useState ([])
    // const [filteredPosts, setFiltered] = useState([])
    const navigate = useNavigate()
    const {postId} = useParams()

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((postsArray) => {
            setPost(postsArray)
            })
    }, [])

        return (
            <>
                <div className="top-of-posts">
                    <h1 className="posts-title">Post Details</h1>
                </div>
                
                <div className="posts-container">
                    {/* {post.map((postObj) => { */}
                        
                            <div className="activity-card" key={post.id}>
                            <div className="each-post">
                                <h3 className="post-title">
                                        {post.title}
                                </h3>
                                <img src={post.image_url}/>
                                <p className="post-details">Author: {post?.user?.full_name}</p>
                                <p className="post-details">Category: {post?.category?.label}</p>
                                <p className="post-details">Content: {post.content}</p>
                            </div>
                            </div>
                        
                    {/* })} */}
                </div>
            </>
        )
    }