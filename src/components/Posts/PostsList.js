import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Posts.css"

    // const localRainbowUser = localStorage.getItem("rainbow_user")
    // const rainbowUserObject = JSON.parse(localRainbowUser)

export const PostList = ({searchTermState}) => {
    const [posts, setPosts] = useState ([])
    const [filteredPosts, setFiltered] = useState([])
    // const [selectedCategory, setSelectedCat] = useState([])
    const [categories, setCategories] = useState ([])
    const navigate = useNavigate()

    // const [filteredPosts, setFiltered] = useState([])

    useEffect(
        () => {
            const searchedPosts = posts.filter(post => {
                return post?.title?.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedPosts)
        },
        [ posts, searchTermState ]
    )

    // useEffect(
    //     () => {
    //         setFiltered(posts)
    //     },
    // [posts]
    // )

    useEffect(() => {
        fetch(`http://localhost:8000/posts`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((postsArray) => {
            setPosts(postsArray)
            setFiltered(postsArray)
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


    const CategoryFilter = (event) => {
        event.preventDefault()
        if (parseInt(event?.target?.value) === 0) {
            const copy = [...posts]
            setFiltered(copy)
        } else {
            const copy = [...posts]
            const filteredCopy = copy.filter(element => element?.category.id === parseInt(event?.target?.value))
            setFiltered(filteredCopy)
        }
    }
    

        return (
            <>



                            <>
                            <aside className="search">
                                <select className="search" onChange={ (event) => { CategoryFilter(event) }} type="categories">
                                    <option value={0} >Search by Category</option>
                                    {categories.map(category => (<option  value={category.id}>{category.label}</option>))}
                                </select>
                            </aside>
                            </>



            <div className="top-of-posts">
                <h1 className="posts-title">Posts</h1>
            </div>
            
            <div className="posts-container">
                {filteredPosts.map(
                    (postObj) => {
                        return (

                        <>

                            <div className="activity-card" key={postObj.id}>
                            <div className="each-post">
                                <h3 className="post-title" value={postObj.id}>
                                    <a className="post-title"  onClick={() => navigate(`/post-details/${postObj.id}`)}>
                                        {postObj.title}
                                    </a>
                                </h3>
                                <img src={postObj.image_url}/>
                                <p className="post-details">Author: {postObj.user.full_name}</p>
                                <p className="post-details">Category: {postObj.category.label}</p>
                            </div>
                            </div>
                        </>
                        )
                })}
                </div>
            </>
        )
    }