import { Navigate } from "react-router-dom";
import Admin from "../containers/Admin";
// eslint-disable-next-line
export default [
  {
    path: "/",
    element: <Navigate to="/admin" />,
  },
  {
    path: "/admin",
    element: <Admin />,
  }
];
