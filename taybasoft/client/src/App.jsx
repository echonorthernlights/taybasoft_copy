import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminPrivateRoute from "./components/AdminPrivateRoute"
import Loader from "./components/Loader"
import PrivateRoute from "./components/PrivateRoute"
import {
  AddJob,
  AddNewPack,
  AddNewSubscriber,
  AddNewSubscription,
  AllPacks,
  AllSubscribers,
  Dashboard,
  DashboardLayout,
  EditSubscriber,
  Error,
  HomeLayout,
  Landing,
  Login,
  RemovePack,
  SubscriberDetails,
  UpdatePack
} from "./pages"
import RemoveSubscriber from "./pages/subscriptions/subscribers/RemoveSubscriber"
import RemoveSubscription from "./pages/subscriptions/subscriptions/RemoveSubscription"
import UpdateSubscription from "./pages/subscriptions/subscriptions/UpdateSubscription"
import { useVerifyAuthenticationQuery } from "./slices/auth/authApiSlice"

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") == "true"
  document.body.classList.toggle("dark-theme", isDarkTheme)
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "app",
        element: <AdminPrivateRoute>
          <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />
        </AdminPrivateRoute>,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "packs",
            element: <AllPacks />,
          },
          {
            path: "packs/new",
            element: <AddNewPack />,
          },
          {
            path: "packs/edit/:packId",
            element: <UpdatePack />,
          },
          {
            path: "packs/delete/:packId",
            element: <RemovePack />,
          },
          {
            path: "subscribers",
            element: <AllSubscribers />,
          },
          {
            path: "subscribers/new",
            element: <AddNewSubscriber />,
          },
          {
            path: "subscribers/:subscriberId",
            element: <SubscriberDetails />,
          },
          {
            path: "subscribers/:subscriberId/edit",
            element: <EditSubscriber />,
          },
          {
            path: "subscribers/:subscriberId/delete",
            element: <RemoveSubscriber />,
          },
          {
            path: "subscribers/:subscriberId/subscriptions/new",
            element: <AddNewSubscription />,
          },
          {
            path: "subscribers/:subscriberId/subscriptions/:subscriptionId/edit",
            element: <UpdateSubscription />,
          },
          {
            path: "subscribers/:subscriberId/subscriptions/:subscriptionId/delete",
            element: <RemoveSubscription />,
          },
        ],
      },
      {
        path: "admin",
        element: <PrivateRoute>
          <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />
        </PrivateRoute>,
        children: [
          {
            path: "",
            element: <AddJob />,
          },

        ],
      },
    ],
  },
])

const App = () => {
  const { data, isLoading, error } = useVerifyAuthenticationQuery()
  if (error) {
    if (error.status === 401) {
      // Remove userInfo from localStorage
      localStorage.removeItem('userInfo');
    }
  }
  if (isLoading) return <Loader center />
  return <RouterProvider router={router} />
}
export default App
