import { Redirect, useLocation } from "react-router-dom";

const NoMatch = () => {
  const location = useLocation();

  return (
    <Redirect
      to={{
        pathname: "/not-found",
        state: { from: location },
      }}
    />
  );
};

export default NoMatch;