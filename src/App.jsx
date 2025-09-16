import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./Pages/RootLayout"
import { HomePage } from "./Pages/HomePage"
import { ViewPdfPage } from "./Pages/ViewPdfPage"
import { Login } from "./Pages/Login"
import { Singup } from "./Pages/Singup"
import { AuthLayout } from "./Pages/AuthLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/pdf/:id",
        element: <ViewPdfPage />
      },

    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/signup",
        element: <Singup />
      },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
