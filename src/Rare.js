import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [user, setUserState] = useState(localStorage.getItem('userId'))


  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  const setUserId = (newUser) => {
    localStorage.setItem('userId', newUser)
    setUserState(newUser)
  }

  return <>
    <NavBar token={token} setToken={setToken} user={user} setUserId={setUserId} />
    <ApplicationViews token={token} setToken={setToken} user={user} setUserId={setUserId} />
  </>
}
