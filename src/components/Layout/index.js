import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Step1 from "pages/step1";
import Step2 from "pages/step2";
import Step3 from "pages/step3";
import Step4 from "pages/step4";
import Step5 from "pages/step5";
import Step6 from "pages/step6";
import Step7 from "pages/step7";


/* TEST COMPONENT //TODO */
import { ConsoleFormStateButton } from "testData/ConsoleFormStateButton";
/* TEST COMPONENT //TODO */

import { ErrorPage } from "components/organisms/ErrorPage";
import { ErrorRedirect } from "components/organisms/ErrorRedirect";
import { PageLoading } from "components/organisms/PageLoading";
import { useApiCall, useFeeUpdate } from "helpers/customHooks";
import { useFormContext } from "react-hook-form";
import { useDependenceReduxStateController } from "components/organisms/DependenceReduxStateController";
import { session } from "api/sessionApi";
import { setGlobalStepsData } from "redux/actions";
import qs from "qs";

const Layout = () => {
  const methods = useFormContext();
  useDependenceReduxStateController(methods);
  const search = window.location.search.replace(/\/$/, '').replace(/^\?/, '');
  useApiCall({
    handler: session.updateSession,
    action: setGlobalStepsData,
    params: qs.parse(search),
  });
  useFeeUpdate();
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/step-1" />
            </Route>
            <Route path="/step-1">
              <Step1 />
            </Route>
            <Route path="/step-2">
              <Step2 />
            </Route>
            <Route path="/step-3">
              <Step3 />
            </Route>
            <Route path="/step-4">
              <Step4 />
            </Route>
            <Route path="/step-5">
              <Step5 />
            </Route>
            <Route path="/step-6">
              <Step6 />
            </Route>
            <Route path="/step-7">
              <Step7 />
            </Route>
            <Route
              path="/error-page"
              render={(props) => <ErrorPage {...props} />}
            />
          </Switch>
        </div>
        <ErrorRedirect />
        <PageLoading />
      </Router>
      {/* TEST COMPONENT //TODO */}
      {process.env.NODE_ENV === "development" && <ConsoleFormStateButton />}
      {/* TEST COMPONENT //TODO */}
      {/* <DependenceReduxStateController /> */}
    </>
  );
};

export default Layout;
