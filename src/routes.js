import {DashboardPage,StaffPage} from "pages"




const dashboardRoutes = [
    {
        path:"/dashboard",
        name:"Dashboard",
        component: DashboardPage,
        layout: "/admin"
        
    },
    {
        path:"/account",
        name:"Account",
        component: DashboardPage,
        layout: "/admin"
        
    },
    {
        path:"/profile",
        name:"Profile",
        component: DashboardPage,
        layout: "/admin"
        
    },

    {
        path:"/staff",
        name:"Staff",
        component: StaffPage,
        layout: "/admin"
        
    },
    
]


export default dashboardRoutes