import { react } from "react";

const Protected = ({ flag, children }) => {
  if (flag) {
    return children;
  } else {
    return <h1>404 Not Found</h1>;
  }
};
export default Protected;
