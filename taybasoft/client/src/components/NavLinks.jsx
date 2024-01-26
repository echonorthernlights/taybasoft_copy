import { NavLink } from "react-router-dom"
import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext()
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link
        const { userRole } = user
        //if (path === "admin" && role !== "admin") return
        if (userRole === "admin") {
          return (
            <NavLink
              to={path}
              key={text}
              className="nav-link"
              onClick={isBigSidebar ? null : toggleSidebar}
              end={path === "." ? true : false}
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          )
        }
        if (userRole === "super admin") {
          return (
            // <NavLink
            //   to={path}
            //   key={text}
            //   className="nav-link"
            //   onClick={isBigSidebar ? null : toggleSidebar}
            //   end={path === "." ? true : false}
            // >
            //   <span className="icon">{icon}</span>
            //   {text}
            // </NavLink>
            <>admin</>
          )
        }
      })}
    </div>
  )
}
export default NavLinks
