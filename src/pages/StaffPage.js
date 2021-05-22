import React,{useState} from 'react'



import {StaffList} from "pages/components/StaffList"
import StaffDetail from "pages/components/StaffDetail"

import {useSelector} from "react-redux"

export function StaffPage() {

    
    const staffs = useSelector(state=>state.auth.data.clinic_staffs)
    const initStaff = staffs ? staffs[0].id : 0
    
    const [selectedStaff,setSelectedStaff] = useState(initStaff)

    const staff = staffs.find(staff => staff.id == selectedStaff)
    return (

      <div className="row">
            <div className="col-lg-4 col-xxl-3 h-100">
                    <StaffList setSelectedStaff={setSelectedStaff} className="card-stretch gutter-b"/>
            </div>
            <div className="col-lg-8 col-xxl-9 h-100">
                    <StaffDetail selectedStaff={selectedStaff} staff={staff}/>
            </div>
      </div>
        
    )
}
