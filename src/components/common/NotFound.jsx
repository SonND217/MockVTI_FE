import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const logOut = () => {
  localStorage.clear();
  navigate("/home");
};
const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/home">
        <Button type="primary" onClick={logOut}>
          Back Home
        </Button>
      </Link>
    }
  />
);
export default NotFound;
