import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {RouterProvider} from "react-router-dom";
import './index.scss'
import {router} from "./app/router.tsx";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
            <RouterProvider router={router}/>
    </Provider>
)
