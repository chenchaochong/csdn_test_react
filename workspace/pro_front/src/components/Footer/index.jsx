import React, {Component} from 'react';
import logo from "../../assets/logowhite.svg"
import './index.scss'
class Index extends Component {
  render() {
    return (
      <div className='footer-container'>
        <div className="footer">
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <div className="copyright">©️2021 CSDN. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}

export default Index;