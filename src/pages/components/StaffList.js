/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {Dropdown} from "react-bootstrap";
import {DropdownCustomToggler, DropDownCRUD, DropdownMenu2,DropdownMenu3,DropdownAction } from "pages/partials/dropdowns"
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "modules/Helper"
import {useSelector} from "react-redux"
import CreateStaff from "../components/Forms/CreateStaff"
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles({
  list: {
    overflow: "auto",
    margin: 0,
    padding: 0,
    
    
  }
});

export function StaffList({ className ,setSelectedStaff}) {

  
    const classes = useStyles();
  
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const {clinic_staffs:staffs} = useSelector(state=>state.auth.data)
          
    return (
        <>
          <div className={`card card-custom ${className} `}>
            {/* Head */}
            <div className="card-header border-0">
              <h3 className="card-title font-weight-bolder text-dark">Staffs</h3>
              <div className="card-toolbar">
                <button onClick={handleClickOpen} className="btn btn-light-primary btn-sm font-weight-bolder ">
                    Create Staff
                </button>
                <CreateStaff handleClose={handleClose} open={open}/>
                
              </div>
            </div>
            {/* Body */}
            <div className={`card-body pt-2  ${classes.list}`}>

              {staffs.map(staff=>{
                return (<div className="d-flex align-items-center mb-10">
                <div className="symbol symbol-40 symbol-light-success mr-5">
                  <span className="symbol-label">
                    <SVG
                      className="h-75 align-self-end"
                      src={toAbsoluteUrl("/media/svg/avatars/015-boy-6.svg")}
                    ></SVG>
                  </span>
                </div>
                <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                  <div onClick={() => setSelectedStaff(staff.id)}
                  
                    
                    className="text-dark text-hover-primary mb-1 font-size-lg"
                  >
                    {staff.firstname + " " + staff.lastname}
                  </div>
                  <span className="text-muted">{staff.telephone}</span>
                </div>
                <ItemDropdown id={staff.id} item="" />
              </div>)
              })}
      
            </div>
          </div>
        </>
      );
    }
    
    const ItemDropdown = ({item,id}) => {
      return (<>
      <Dropdown className="dropdown-inline" alignRight>
        <Dropdown.Toggle
          id="dropdown-toggle-top"
          as={DropdownCustomToggler}>
          <i className="ki ki-bold-more-hor" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
          <DropdownAction id={id} />
        </Dropdown.Menu>
      </Dropdown>
      </>);
    };