
import DashBoardPage from "pages/Dashboard.js"
import Staffs from "pages/Staffs"



const dashboardRoutes = [
    {
        path:"/dashboard",
        name:"Dashboard",
        component: DashBoardPage,
        layout: "/admin"
        
    },
    {
        path:"/account",
        name:"Account",
        component: DashBoardPage,
        layout: "/admin"
        
    },
    {
        path:"/profile",
        name:"Profile",
        component: DashBoardPage,
        layout: "/admin"
        
    },

    {
        path:"/staff",
        name:"Staff",
        component: Staffs,
        layout: "/admin"
        
    },
    
]


export default dashboardRoutes