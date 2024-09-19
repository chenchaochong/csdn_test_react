import React, { Component } from "react";
import { Input, Button, message, Spin } from "antd";
import token from "../../utils/token";
import photoSmall from "../../assets/photosmall.svg";
import seen from "../../assets/seen.svg";
import praise from "../../assets/praise.svg";
import chat from "../../assets/chat.svg";
import pic1 from "../../assets/pic1@2x.png";
import pic2 from "../../assets/pic2@2x.png";
import praisebig from "../../assets/praisebig.svg";
import reportIcon from "../../assets/reportIcon.svg";
import share from "../../assets/share.svg";
import collectionIcon from "../../assets/collectionIcon.svg";
import praised from "../../assets/praised.svg";
import ad1 from "../../assets/ad1.svg";
import ad2 from "../../assets/ad2@2x.png";
import "./index.scss";

const { TextArea } = Input;

class Index extends Component {
  state = {
    type: 1,
    result: [],
    content: "",
    nomore:false,
    currentPage:1,
    sumPage:1
  };

  componentDidMount() {
    this.fetchReviewGet(1);
  }
  fetchReviewGet = (type) => {
    fetch(
      `http://127.0.0.1:8000/api/review?uri=http://127.0.0.1:8000/index.html&type=${type}&page=${this.state.currentPage}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "User-Id": token,
        },
        requestType: "form",
      }
    )
      .then(function (data) {
        return data.json();
      })
      .then((rsp) => {
        console.log(rsp);
        this.setState({ results: rsp.data.results,sumPage:Math.floor(rsp.data.count/10+1) });
        message.info(rsp.msg);
      });
  };
  fetchReviewPost = () => {
    const { content } = this.state;
    const formData = new FormData();
    formData.append("uri", "http://127.0.0.1:8000/index.html");
    formData.append("content", content);
    fetch("http://127.0.0.1:8000/api/review", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "User-Id": token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        message.info(data.msg);
        this.fetchReviewGet(this.state.type);
      })
      .catch((error) => console.error(error));
  };
  fetchReviewLike = (type, review_id) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("review_id", review_id);
    fetch("http://127.0.0.1:8000/api/review/like", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "User-Id": token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        message.info(data.msg);
        this.fetchReviewGet(this.state.type);
      })
      .catch((error) => console.error(error));
  };
  loadmore = (type)=>{
    const {currentPage,sumPage} = this.state
      this.setState({currentPage:currentPage+1},()=>{
        fetch(
          `http://127.0.0.1:8000/api/review?uri=http://127.0.0.1:8000/index.html&type=${type}&page=${this.state.currentPage}`,
          {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "User-Id": token,
            },
            requestType: "form",
          }
        )
          .then(function (data) {
            return data.json();
          })
          .then((rsp) => {
            console.log(rsp);
            this.setState({ results: [...this.state.results,rsp.data.results],sumPage:Math.floor(rsp.data.count/10+1) });
            message.info(rsp.msg);
          });
      })
  }
  render() {
    const { results,nomore,sumPage,currentPage } = this.state;
    console.log(currentPage,sumPage)
    return (
      <div className="main-container">
        <div className="top-container">
          <div className="left">
            <div className="top">徒步之旅挑战玄奘之路！</div>
            <div className="bottom">
              <span>6小时前</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>原创作品/摄影/风景</span>
            </div>
          </div>
          <div className="right">
            <div className="top">
              <img src={photoSmall} alt="" />
              <div className="name">
                <div className="name-top">白月光讲堂</div>
                <div className="name-bottom">骨灰级技术</div>
              </div>
              <div className="btn">关注</div>
            </div>
            <div className="bottom">
              <img src={seen} alt="" />
              <span className="num">1229</span>
              <span
                style={{
                  width: "1px",
                  height: "18px",
                  marginLeft: "20px",
                  marginRight: "25px",
                  background: "#e2e2e2",
                }}
              ></span>
              <img src={chat} alt="" />
              <span className="num">110</span>
              <span
                style={{
                  width: "1px",
                  height: "18px",
                  marginLeft: "20px",
                  marginRight: "25px",
                  background: "#e2e2e2",
                }}
              ></span>
              <img src={praise} alt="" />
              <span className="num">26</span>
            </div>
          </div>
        </div>
        <div className="divid"></div>
        <img src={pic1} className="pic1" alt="" />
        <img src={pic2} className="pic2" alt="" />
        <div className="praisebig">
          <img src={praisebig} alt="" />
          <div className="num">7</div>
        </div>
        <div className="divid"></div>
        <div className="shengming">
          <div className="left">
            声明：本站内网友所发表的所有内容及言论仅代表本人，并不反映任何本站之意见及观点。
          </div>
          <div className="right">
            <img src={reportIcon} alt="" />
            <span className="text" style={{ marginRight: "31px" }}>
              举报
            </span>
            <div className="btn">
              <img src={share} alt="" />
              <span className="text">分享</span>
            </div>
            <div className="btn">
              <img src={collectionIcon} alt="" />
              <span className="text">收藏</span>
            </div>
          </div>
        </div>
        <div className="pinglun">
          <div className="main">
            <div className="left-container">
              <div className="title">用户评论</div>
              <div className="area">
                <TextArea
                  rows={4}
                  placeholder="评论你的想法～"
                  onChange={(e) => {
                    this.setState({ content: e.target.value });
                  }}
                />
                <Button className="btn" onClick={this.fetchReviewPost}>
                  评论
                </Button>
              </div>
              <div className="tabs">
                <div
                  className={this.state.type === 1 ? "tab active" : "tab"}
                  onClick={() => {
                    this.setState({ type: 1 });
                    this.fetchReviewGet(1);
                  }}
                >
                  默认
                </div>
                <div
                  className={this.state.type === 2 ? "tab active" : "tab"}
                  onClick={() => {
                    this.setState({ type: 2 });
                    this.fetchReviewGet(2);
                  }}
                >
                  最新
                </div>
              </div>
              <div className="divid"></div>
              {results?.map((item) => {
                return (
                  <div className="info" key={item.id}>
                    <div className="left">
                      <div className="top">{item.content}</div>
                      <div className="time">{item.create_time}</div>
                    </div>
                    <div
                      className="right"
                      onClick={() =>
                        this.fetchReviewLike(item.is_like ? 2 : 1, item.id)
                      }
                    >
                      {item.is_like ? (
                        <img src={praised} alt="" />
                      ) : (
                        <img src={praise} alt="" />
                      )}
                      <span className="num">{item.like}</span>
                    </div>
                  </div>
                );
              })}
              <div className="info">
                <div className="left">
                  <div className="top">非常棒，人生需要这样一次徒步体验</div>
                  <div className="time">今天 19:05:00</div>
                </div>
                <div className="right">
                  <img src={praised} alt="" />
                  <span className="num">1897</span>
                </div>
              </div>
              {currentPage<sumPage&&<div className="nomore" onClick={()=>{this.loadmore(this.state.type)}}>"查看更多"</div>}
              {currentPage===sumPage&&<div className="nomore">没有更多了～</div>}
            </div>
            <div className="right-container">
              <div className="zuo">
                <div className="title">作品信息</div>
                <div className="time">创作时间</div>
                <div className="text">2021/08/02</div>
                <div className="jieshao">作品介绍</div>
                <div className="text">
                  这是CSDN公司组织的一次员工徒步旅
                  行，整个行程非常有意义，这是CSDN 公司组织的一次员工徒步旅行。
                </div>
              </div>
              <div className="biaoqian">
                <div className="title">标签</div>
                <div className="di-flex">
                  <div className="di">博客</div>
                  <div className="di">摄影</div>
                  <div className="di">风景</div>
                  <div className="di">隔壁</div>
                  <div className="di">玄奘之路</div>
                  <div className="di">徒步</div>
                </div>
              </div>
              <img src={ad1} style={{ marginTop: "14px" }} alt="" />
              <img
                src={ad2}
                style={{ marginTop: "14px", width: "264px", height: "110px" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
