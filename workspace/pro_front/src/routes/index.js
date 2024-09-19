import { Navigate } from "react-router-dom";
import Index from "../containers/Index";
// eslint-disable-next-line
export default [
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "/index",
    element: <Index />,
  }
];
