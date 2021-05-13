import React,{Suspense,lazy} from "react"
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "_metronic/layout";
import {BuilderPage} from "./BuilderPage";
import {MyPage} from "./MyPage";
import {DashboardPage} from "./DashboardPage";

import routes from "routes.js"

const GoogleMaterialPage = lazy(() =>
  import("./GoogleMaterialExamples/GoogleMaterialPage")
);

const ReactBootstrapPage = lazy(() =>
  import("./ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./ECommerce/pages/eCommercePage")
);






const switchAdminRoutes = (
    
    <Switch>
        {routes.map((prop,key) => {
            if(prop.layout === "/admin"){
                return (
                    <Route
                        path = {prop.layout + prop.path}
                        component = {prop.component}
                        key={key}
                    />
                )
            }
            
        })}
        
    </Switch>
)

export default function AdminRoutes() {
    console.log(switchAdminRoutes)
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            {switchAdminRoutes}
        </Suspense>
    )
}
