/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

export function DropdownAction() {
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
                <a href="#" className="navi-link">
                    <span className="navi-icon"><i className="flaticon2-list-3"></i></span>
                    <span className="navi-text text-danger">Delete</span>
                </a>
            </li>
            
        </ul>
        {/*end::Navigation*/}

    </>
}
