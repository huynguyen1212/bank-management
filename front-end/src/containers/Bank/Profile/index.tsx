import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { useHistory } from "react-router";
import { requestToken } from "src/api/axios";
import API_URL from "src/api/url";
import { ProfileContext } from "src/common/context/NavigatorContext";
import { RoleContext } from "src/common/context/RoleContext";
import { ThemeContext } from "styled-components";
import { SProfile } from "./styles";

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const history = useHistory();
  const { data, setData } = useContext(ProfileContext)
  const { setRole } = useContext(RoleContext);

  useEffect(() => {
    requestToken({
      method: "GET",
      url: API_URL.AUTH.PROFILE
    }).then((res) => {
      setData(res?.data?.data);
      setRole((res.data.data.user.role as string).toLocaleLowerCase())
    })
  }, [])

  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const onChange = (e: any) => {
    console.log(e.target.files)
    const imgSrc = URL.createObjectURL(e.target.files[0]);
    setImgSrc(imgSrc);
  }

  return (
    <SProfile>
      <FaArrowLeft
        color={theme.icon.inactive}
        className="back"
        onClick={() => history.goBack()}
        size={30}
      />
      <label className="avt" style={{ marginBottom: "30px" }}>
        <Avatar src={imgSrc || "/images/avt-placeholder.png"} size={80} />
        <FaCamera color={theme.icon.inactive} className="icon" size={20} />
        <input
          type="file"
          onChange={onChange}
          accept="image/png, image/jpeg"
          name="avt"
          style={{ display: "none" }}
        />
        <div className="name">{data?.name}</div>
      </label>

      <div className="info">
        <h1>Thông tin cơ bản</h1>

        <div className="info_detail">
          <div className="detail_item">
            <p className="title">Tên:</p>
            <p className="content">{data?.name}</p>
          </div>

          <div className="detail_item">
            <p className="title">Ngày sinh:</p>
            <p className="content">{data?.birthday}</p>
          </div>

          <div className="detail_item">
            <p className="title">Số CNT/CCCD</p>
            <p className="content">{data?.card_id}</p>
          </div>

          <div className="detail_item">
            <p className="title">Ngày tạo:</p>
            <p className="content">{new Date(data?.createdAt)?.toLocaleString()}</p>
          </div>

          {
            data?.expYear && (
              <div className="detail_item">
                <p className="title">Số năm kinh nghiệm:</p>
                <p className="content">{data?.expYear}</p>
              </div>
            )
          }

          <div className="detail_item">
            <p className="title">Mã:</p>
            <p className="content">{data?.id}</p>
          </div>

          <div className="detail_item">
            <p className="title">Địa chỉ:</p>
            <p className="content">{data?.address}</p>
          </div>

          {
            data?.position && (
              <div className="detail_item">
                <p className="title">Vị trí:</p>
                <p className="content">{data?.position}</p>
              </div>
            )
          }

          {
            data?.rate && (
              <div className="detail_item">
                <p className="title">Đánh giá:</p>
                <p className="content">{data?.rate}</p>
              </div>
            )
          }

          <div className="detail_item">
            <p className="title">Trạng thái:</p>
            <p className="content">Hoạt động</p>
          </div>

          <div className="detail_item">
            <p className="title">Role:</p>
            <p className="content">{data?.user?.role === "STAFF" ? "Nhân viên" : data?.user?.role === "ADMIN" ? "Admin" : "Khách hàng"}</p>
          </div>
        </div>
      </div>

      {/* <Button style={{ minWidth: "100px" }} type="primary">
        Save
      </Button> */}
    </SProfile>
  );
}
