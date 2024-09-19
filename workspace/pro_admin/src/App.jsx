import React from "react";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import './App.scss'

export default function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  return (
    <div className='app-index'>
      {element}
    </div>
  );
}
