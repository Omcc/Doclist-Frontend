import React,{useEffect} from 'react'
import Layout from "./Admin2.js"
import AdminRoutes from "pages/AdminRoutes"
import {actions} from "modules/Administration/_redux/adminRedux"
import {connect} from "react-redux"

function AdminMainLayout(props) {

   
    
    return (
        
        
        <Layout>
            <AdminRoutes />
        </Layout>
    )
}


export default connect(null,actions)(AdminMainLayout)
