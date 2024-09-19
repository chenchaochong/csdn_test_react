import "./index.scss";
import { message } from "antd";
import { useState, useRef } from "react";
import { ProTable } from "@ant-design/pro-components";
import token from "../../utils/token";
import menuIcon1 from "../../assets/menuIcon1.svg";
const Index = () => {
  const actionRef = useRef();
  const [page, setPage] = useState(1);
  const [id, setId] = useState();
  const [uri, setUri] = useState();
  const [content, setContent] = useState();
  const [createModalVisible, handleModalVisible] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "20%",
      search: true,
    },
    {
      title: "URI地址",
      dataIndex: "uri",
      width: "20%",
      search: true,
    },
    {
      title: "评论条数（条）",
      dataIndex: "like",
      search: false,
    },
    {
      title: "操作",
      width: "20%",
      search: false,
      render: (_, item) => [
        <a
          key="edit"
          className="info-btn"
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          评论详情
        </a>,
      ],
    },
  ];
  const columns2 = [
    {
      title: "ID",
      dataIndex: "id",
      width: "1%",
      search: false,
    },
    {
      title: "评论内容",
      dataIndex: "content",
      width: "40%",
      search: true,
    },
    {
      title: "评论时间",
      dataIndex: "create_time",
      with: "30%",
      search: false,
    },
    {
      title: "操作",
      width: "20%",
      search: false,
      render: (_, item) => [
        <a key="edit" onClick={() => {}}>
          <div style={{ display: "flex" }}>
            <span
              className="zhiding"
              style={{
                width: "60px",
                height: "28px",
                background: "#fff",
                borderRadius: "4px",
                border: "1px solid #dddfe6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
                color: "#000",
              }}
              onClick={() => {
                console.log("置顶ID", item.id);
                const formData = new FormData();
                formData.append("review_id", item.id);
                fetch("http://127.0.0.1:8000/api/admin-review/set_top", {
                  method: "POST",
                  headers: {
                    "User-Id": token,
                  },
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    message.success("置顶成功，请刷新查看");
                    requestData2();
                  })
                  .catch((error) => console.error(error));
              }}
            >
              置顶
            </span>
            <span
              style={{
                width: "60px",
                height: "28px",
                background: "#fe4a49",
                borderRadius: "4px",
                border: "1px solid #dddfe6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
                color: "#fff",
              }}
              onClick={() => {
                console.log("置顶ID", item.id);
                const formData = new FormData();
                formData.append("review_id", item.id);
                formData.append("status", item.status === 1 ? 2 : 1);
                fetch("http://127.0.0.1:8000/api/admin-review/set_visibility", {
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
                    message.success("操作成功，请刷新查看");
                  })
                  .catch((error) => console.error(error));
              }}
            >
              {item.status === 1 ? "隐藏" : "可见"}
            </span>
          </div>
        </a>,
      ],
    },
  ];
  const requestData = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/admin-resource?uri=http://127.0.0.1:8000/index.html&page=${page}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "User-Id": token,
        },
        requestType: "form",
      }
    )
      .then((res) => res.json())
      .then((results) => {
        console.log("request", results);
        return {
          data: results.data.results,
          success: true,
          total: results.data.count,
        };
      })
      .catch((err) => console.log(err));
    return Promise.resolve(response);
  };
  // 资源列表不能精确匹配搜索
  const searchData = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/admin-resource?uri=http://127.0.0.1:8000/index.html&id=${id}&uri=${uri}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "User-Id": token,
        },
        requestType: "form",
      }
    )
      .then((res) => res.json())
      .then((results) => {
        console.log("request", results);
        return {
          data: results.data.results,
          success: true,
          total: results.data.count,
        };
      })
      .catch((err) => console.log(err));
    return Promise.resolve(response);
  };
  const searchData2 = () => {
    const response = fetch(
      `http://127.0.0.1:8000/api/admin-review?uri=http://127.0.0.1:8000/index.html&keyword=${content}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "User-Id": token,
        },
        requestType: "form",
      }
    )
      .then((res) => res.json())
      .then((results) => {
        console.log("request", results);
        return {
          data: results.data.results,
          success: true,
          total: results.data.count,
        };
      })
      .catch((err) => console.log(err));
    return Promise.resolve(response);
  };
  const requestData2 = async (parms) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/admin-review?uri=http://127.0.0.1:8000/index.html&page=${page}`,
      {
        method: "GET",
        headers: {
          "User-Id": token,
        },
        requestType: "form",
      }
    )
      .then((res) => res.json())
      .then((results) => {
        console.log("request", results);
        return {
          data: results.data.results,
          success: true,
          total: results.data.count,
        };
      })
      .catch((err) => console.log(err));
    return Promise.resolve(response);
  };
  return (
    <div className="admin-container">
      <div className="left-container">
        <div className="nav">
          <img src={menuIcon1} alt="" />
          <span style={{ marginLeft: "15px" }}>URI管理</span>
        </div>
      </div>
      <div className="right-container">
        <div className="top-container">
          <div className="left">URI管理</div>
          <div>此处再显示一排操作按钮</div>
        </div>
        <ProTable
          pagination={{
            pageSize: 10,
            onChange: (page, pageSize) => {
              console.log("当前页", page);
              setPage(page);
            },
          }}
          actionRef={actionRef}
          search={{
            labelWidth: 120,
          }}
          beforeSearchSubmit={(value) => {
            console.log("搜索输入内容", value);
            setId(value.id);
            setUri(value.uri);
          }}
          request={!(id||uri)?requestData:searchData}
          columns={columns}
          rowKey={(record) => record.id}
          options={false}
        />
        <div className="footer">
          <span>Copyright </span>&copy; <span>2021 CSDN出品</span>
        </div>
      </div>
      {createModalVisible && (
        <div className="zhezhao">
          <div className="content-container">
            <div className="top">
              <div className="title">评论详情</div>
              <div
                className="close"
                onClick={() => {
                  handleModalVisible(false);
                }}
              >
                X
              </div>
            </div>
            {/* <div className="search-container">
            <div className="input-box">
              <img src={fangdajingsousuo} alt="" />
              <input type="text" className="input" placeholder="请输入评论内容关键字"/>
            </div>
            <div className="search-btn">搜索</div>
          </div> */}
            <ProTable
              pagination={{
                pageSize: 10,
                onChange: (page, pageSize) => {
                  console.log("当前页", page);
                  setPage(page);
                },
              }}
              actionRef={actionRef}
              search={{
                labelWidth: 70,
              }}
              beforeSearchSubmit={(value) => {
                console.log("搜索输入内容", value,value.content);
                setContent(value.content)
              }}
              request={!content?requestData2:searchData2}
              columns={columns2}
              rowKey={(record) => record.id}
              options={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Index;
