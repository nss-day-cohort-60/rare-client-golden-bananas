import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Categories.css"

// const localRainbowUser = localStorage.getItem("rainbow_user")
// const rainbowUserObject = JSON.parse(localRainbowUser)

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    // const [filteredPosts, setFiltered] = useState([])
    const [value, setValue] = useState('')
    const navigate = useNavigate()

    // useEffect(
    //     () => {
    //         const searchedPosts = posts.filter
    //         (post => {
    //             return post.name.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFiltered(searchedPosts)
    //     },
    //     [ searchTermState ]
    // )

    // useEffect(
    //     () => {
    //         setFiltered(posts)
    //     },
    // [posts]
    // )


    useEffect(() => {
        fetch(`http://localhost:8000/categories`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((categoryArray) => {
                setCategories(categoryArray)
            })
    }, [])
    const rerender = () => {
        fetch(`http://localhost:8000/categories`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((categoryArray) => {
                setCategories(categoryArray)
            })
    }

    const handleChange = (event) => {
        setValue(event.target.value);

    };
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const categoryToSendToAPI = {
            label: value

        }
        return fetch(`http://localhost:8000/categories`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryToSendToAPI)
        })
            .then(rerender)
    }
    const deleteButton = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            fetch(`http://localhost:8000/categories/${id}`, {
            method: "DELETE",
                headers:{
                    "Authorization": `Token ${localStorage.getItem("auth_token")}`
                }    
            })
            .then(() => {
                rerender()
            })
        }
    }


    return (
        <>
            <div className="top-of-posts">
                <h1 className="categories-page-title">Categories</h1>
            </div>
            <div className="categories">
            <div className="categories-container">
                    {categories.map((categoryObj) => {
                        return (
                            <div className="categories-buttons">
                                <div className="edit-delete-btn">
                                <button className="button is-medium is-danger" onClick={()=> {
                                    deleteButton(categoryObj.id)}}>Delete</button>
                                </div>
                            <div className="activity-card" key={categoryObj.id}>
                                <div className="each-post">
                                    <h3 className="categories-title">{categoryObj.label}</h3>
                                    
                                </div>
                            </div>
                            </div>
            
                )
                })}
            </div>
                <div className="search-container">
                <form>
                    <div className="search-title">
                    <label htmlFor="categoryadd">Create a New Category</label>
                    </div>
                    <div className="category-search">
                    <input className="categoryadd" type="text" value={value} onChange={handleChange} />
                    </div>
                    <div className="category-btn">
                    <button className="button is-normal"
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    >Create Category</button>
                    </div>
                </form>
                </div>

                
            </div>
        </>
    )
}