import React from "react";
import {useRoutes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import routes from "./routes";
import './App.scss'

export default function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  return (
    <div className='app-index'>
      <Header/>
      {element}
      <Footer/>
    </div>
  );
}
