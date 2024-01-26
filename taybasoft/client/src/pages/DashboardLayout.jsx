import React, { createContext, useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import Wrapper from "../assets/wrappers/main"
import { BigSidebar, NavBar, SmallSidebar } from "../components"
import { useGetUserRoleQuery } from "../slices/auth/authApiSlice"
const DashboardContext = createContext()

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  let user = JSON.parse(localStorage.getItem("userInfo"))
  const { data } = useGetUserRoleQuery(user.userRole)

  if (data) {
    user = { ...user, userRole: data.role }
  }
  console.log(user)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="main">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="main-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
