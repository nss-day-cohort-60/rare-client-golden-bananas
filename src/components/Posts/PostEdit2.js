import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Posts.css"

export const PostEditForm2 = () => {
    const localUser = localStorage.getItem("userId")
    const userObject = JSON.parse(localUser)

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }
    
    const today = getCurrentDate()

    const [post, setPost] = useState({
            category: {},
            title: "",
            publication_date: `${today}`,
            image_url: "",
            content: "",
            user_id: userObject,
            approved: false
    })
    const [categories, setCategories] = useState ([])
    const navigate = useNavigate()
    const {postId} = useParams()

    // useEffect(() => {
    //     fetch(`http://localhost:8000/posts?id=${postId}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         setPost(data[0])
    //     })
    // }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(response => response.json())
        .then((data) => {
            setPost(data)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/categories`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((catArray) => {
            setCategories(catArray)
            })
    }, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        const sendToApi = {
            category: parseInt(post.category.id),
            title: post.title,
            publication_date: `${today}`,
            image_url: post.image_url,
            content: post.content,
            user_id: userObject,
            approved: post.approved
        }
            fetch(`http://localhost:8000/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendToApi)
            })
            .then(() => {
                    navigate("/my-posts");
        })
    }

        return (
            <>
            
            <form className="postForm">
                <h2 className="postForm_title">Edit Post</h2>
                <fieldset>
                    <div className="">
                        <label>
                            <select className="form-group" 
                            value= {post.category.id}
                            onChange={(evt) => {
                                const copy = { ...post }
                                copy.category.id = parseInt(evt.target.value)
                                setPost(copy)
                            }} >
                                <option value={0} type="select" className="editPostForm">Choose Category</option>
                                {
                                    categories.map(
                                        (categoryObj) => {
                                            return <option value={categoryObj.id} key={categoryObj.id}>{categoryObj.label}</option>
                                        }
                                    )
                                }
                            </select>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="act-text" htmlFor="title">Title: </label>
                        <input
                            type="text"
                            className="act-control"
                            placeholder="Title"
                            value={post.title}
                            onChange={
                                (evt)=> {
                                    const copy = {...post}
                                    copy.title = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="act-text" htmlFor="image_url">Image_url: </label>
                        <input
                            type="text"
                            className="act-control"
                            placeholder="Image URL"
                            value={post.image_url}
                            onChange={
                                (evt)=> {
                                    const copy = {...post}
                                    copy.image_url = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="act-text2" htmlFor="content">Content: </label>
                        <input
                            type="text"
                            className="act-control2"
                            placeholder="Content"
                            value={post.content}
                            onChange={
                                (evt)=> {
                                    const copy = {...post}
                                    copy.content = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="act-text" htmlFor="approved">Approved: </label>
                        <input
                            type="checkbox"
                            className="act-control2"
                            checked={post.approved}
                            onChange={
                                (evt)=> {
                                    const copy = {...post}
                                    copy.approved = !copy.approved
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>

    
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="save-button">
                    Save Post
                </button>
            </form>
            </>
        )}