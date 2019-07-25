import React, { FunctionComponent } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

import { getSessionKey } from "../libs/session";

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={
      props =>
        getSessionKey() ?
        // @ts-ignore
        ( <Component {...props} /> ) :
        ( 
          <Redirect 
            to={{
              pathname: "/login",
              state: {from: props.location}
            }} 
          /> 
        )
    }
  />
);

export interface PrivateRouteProps extends RouteProps {}
