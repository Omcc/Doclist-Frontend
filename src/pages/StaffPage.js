import React from 'react'

import {
    MixedWidget1,
    MixedWidget14,
    ListsWidget9,
    StatsWidget11,
    StatsWidget12,
    ListsWidget1,
    AdvanceTablesWidget2,
    AdvanceTablesWidget4,
    ListsWidget3,
    ListsWidget4,
    ListsWidget8
} from "_metronic/_partials/widgets";

import {StaffList} from "pages/components/StaffList"
import StaffDetail from "pages/components/StaffDetail"

export function StaffPage() {
    return (

      <div className="row">
            <div className="col-lg-4 col-xxl-3 h-100">
                    <StaffList className="card-stretch gutter-b"/>
            </div>
            <div className="col-lg-8 col-xxl-9 h-100">
                    <StaffDetail />
            </div>
      </div>
        
    )
}
