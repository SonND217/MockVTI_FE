import { Navigate } from "react-router-dom";
import { getAcessToken } from "../utils/helper";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const accessToken = getAcessToken();

  // nếu không có access token thì điều hướng về trang login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // return về trang layout
  return (
    <>
      {children} {/* <Layout /> */}
    </>
  );
};

export default PrivateRoute;
