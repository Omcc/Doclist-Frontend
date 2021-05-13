/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {Dropdown} from "react-bootstrap";
import {DropdownCustomToggler, DropDownCRUD, DropdownMenu2,DropdownMenu3,DropdownAction} from "pages/partials/dropdowns"
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "modules/Helper"

export function StaffList({ className }) {
    return (
        <>
          <div className={`card card-custom ${className}`}>
            {/* Head */}
            <div className="card-header border-0">
              <h3 className="card-title font-weight-bolder text-dark">Staffs</h3>
              <div className="card-toolbar">
                <button className="btn btn-light-primary btn-sm font-weight-bolder ">
                    Create Staff
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="card-body pt-2">
              <div className="d-flex align-items-center mb-10">
                <div className="symbol symbol-40 symbol-light-success mr-5">
                  <span className="symbol-label">
                    <SVG
                      className="h-75 align-self-end"
                      src={toAbsoluteUrl("/media/svg/avatars/015-boy-6.svg")}
                    ></SVG>
                  </span>
                </div>
                <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                  <a
                    href="#"
                    className="text-dark text-hover-primary mb-1 font-size-lg"
                  >
                    Ricky Hunt
                  </a>
                  <span className="text-muted">PHP, SQLite, Artisan CLI</span>
                </div>
                <ItemDropdown item="" />
              </div>
    
              <div className="d-flex align-items-center mb-2">
                <div className="symbol symbol-40 symbol-light-success mr-5">
                  <span className="symbol-label">
                    <SVG
                      className="h-75 align-self-end"
                      src={toAbsoluteUrl("/media/svg/avatars/016-boy-7.svg")}
                    ></SVG>
                  </span>
                </div>
                <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                  <a
                    href="#"
                    className="text-dark text-hover-primary mb-1 font-size-lg"
                  >
                    Carles Puyol
                  </a>
                  <span className="text-muted">PHP, SQLite, Artisan CLI</span>
                </div>
                <ItemDropdown item="" />
              </div>
            </div>
          </div>
        </>
      );
    }
    
    const ItemDropdown = ({item}) => {
      return (<>
      <Dropdown className="dropdown-inline" alignRight>
        <Dropdown.Toggle
          id="dropdown-toggle-top"
          as={DropdownCustomToggler}>
          <i className="ki ki-bold-more-hor" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
          <DropdownAction />
        </Dropdown.Menu>
      </Dropdown>
      </>);
    };