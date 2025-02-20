import { createBrowserRouter } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import Atticle from "../article/Atticle";
import SendRequest from "../reuquest/SendRequest";
import PrivateRoutes from "../helper/PrivateRoutes";


let router=createBrowserRouter([
    {
        path:"/",
        element:<PrivateRoutes><Atticle></Atticle></PrivateRoutes>
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/register',
        element:<Register></Register>
    },{
        path:'/sendRequest',
        element:<PrivateRoutes><SendRequest></SendRequest></PrivateRoutes>
    }
])

export default router