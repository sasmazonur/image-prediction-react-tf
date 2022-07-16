import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SalaryPredict from "./pages/salaryPage"
import SalaryStats from "./pages/SalaryStatsPage"
import Otesting from "./pages/OtestingPage"
import PredictImage from "./pages/PredictImage"
import SortAlgo from "./pages/sortinAlgoPage"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * It returns a Switch component that contains a Route component for each page in the app
 * @returns The Routes component is being returned.
 */
const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/sortalgo">
                <SortAlgo/>
            </Route>
            <Route exact path="/prediction">
                <SalaryPredict/>
            </Route>
            <Route exact path="/salarystats">
                <SalaryStats/>
            </Route>
            <Route exact path="/imagepredict">
            <PredictImage/>
            </Route>
        </Switch>
    );
};

export default Routes;
