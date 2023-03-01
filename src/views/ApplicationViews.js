import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { MyPosts } from "../components/Posts/MyPosts"
import { SinglePost } from "../components/Posts/SinglePost"
import { CategoryList } from "../components/Categories/CategoriesList"
import { Authorized } from "./Authorized"
import { PostContainer } from "../components/Posts/PostContainer"
// import { PostList } from "../components/Posts/PostsList"
import { AddPostForm } from "../components/Posts/AddPostForm"
// import { PostEditForm } from "../components/Posts/PostEdit"
import { PostEditForm2 } from "../components/Posts/PostEdit2"

export const ApplicationViews = ({ token, setToken, user, setUserId }) => {
  return <>
    <Routes>
      <Route path="/" element={<><Outlet/></>} />
      <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />}  />
      <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />}  />
      <Route path="/posts" element={<PostContainer setToken={setToken} setUserId={setUserId} />}  />

      <Route path="/post-details/:postId" element={<SinglePost setToken={setToken} setUserId={setUserId} />} />

      <Route path="/categories" element={<CategoryList setToken={setToken} setUserId={setUserId} />}  />
      <Route element={<Authorized token={token} user={user} />}>
        {/* Add Routes here */}
      <Route path="/my-posts" element={<MyPosts setToken={setToken} setUserId={setUserId} />}  />
      <Route path="/new-post" element={<AddPostForm setToken={setToken} setUserId={setUserId} />}  />
      {/* <Route path="/post-edit/:postId" element={<PostEditForm setToken={setToken} />} /> */}
      <Route path="/post-edit/:postId" element={<PostEditForm2 setToken={setToken} setUserId={setUserId} />} />
      </Route>
    </Routes>
  </>
}
