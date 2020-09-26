import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({
  path,
  component,
}: {
  path: string;
  component: React.ComponentType<any>;
}) => {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
