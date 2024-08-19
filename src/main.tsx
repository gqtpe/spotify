import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <div>Not Found</div>,
        children: [
            {
                path: "/home",
                element: <div>homePage</div>
            }
        ]
    }
])


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
