import React, { useEffect } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import Dashboard from "../containers/dashboard";
import MainLayout from "../Hoc/MainLayout";
import Login from "../containers/login";
import SecureStorage from "./SecureStorage";
import { checkUser } from "../actions/loginActions"

export default function Routes() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  return (
    <HashRouter>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
              if (SecureStorage.getItem("token")) {
                return (
                  <Switch>
                    <Dashboard>
                    </Dashboard>
                    >
                  </Switch>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </MainLayout>
    </HashRouter>
  );
}
