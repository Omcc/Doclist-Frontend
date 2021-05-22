/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {actions} from "modules/Auth/_redux/authRedux"
import {connect} from "react-redux"
import { Dropdown } from "bootstrap";



const handleDelete = (props) => {
    console.log(props)
   props.deleteStaffRequest(props.id)
}

const mapDispatchToProps = dispatch => {
    return {
        deleteStaff: actions.deleteStaffRequest
    }
}

function DropdownAction(props) {
    return <>
        {/*begin::Navigation*/}
        
        <ul className="navi navi-hover py-5">
            
            <li className="navi-item">
                <a href="#" className="navi-link">
                    <span className="navi-icon"><i className="flaticon2-drop"></i></span>
                    <span className="navi-text">Edit</span>
                </a>
            </li>
            <li className="navi-item">
                <div onClick={() => handleDelete(props)}className="navi-link" style={{cursor:"pointer"}}>
                    <span className="navi-icon"><i className="flaticon2-list-3"></i></span>
                    <span className="navi-text text-danger">Delete</span>
                </div>
                    
                
            </li>
            
        </ul>
        {/*end::Navigation*/}

    </>
}

export default connect(null,{deleteStaffRequest:actions.deleteStaffRequest})(DropdownAction)
{}

