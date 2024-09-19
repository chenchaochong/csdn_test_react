import React from 'react'
import logo from "../../assets/logo.svg"
import moreIcon from "../../assets/uploadIcon.svg"
import searchIcon from "../../assets/searchIcon.svg"
import './index.scss'

export default function Index() {
	return (
		<div className='header-container'>
			<div className="header">
				<div className="logo">
					<img src={logo} alt="logo"/>
				</div>
				<div className="header-tabs">
					<div className="tab">首页</div>
					<div className="tab">发现</div>
					<div className="tab">专栏</div>
					<div className="tab">视频</div>
					<div className="tab">关于博主</div>
					<div className='input-box'>
					<input type="text" placeholder='请输入关键字' className='input'/>
					<img src={searchIcon} alt=""/>
					</div>
				</div>
				<div className="right">
					<img src={moreIcon} style={{marginRight:'24px'}} alt=""/>
					<div className="text">登录</div>
					<div className="dev"></div>
					<div className="text">注册</div>
				</div>
			</div>
		</div>

	)
}
