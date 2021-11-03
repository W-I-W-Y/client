import React, { useEffect, useState } from "react";
import "./Modal.css";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Row, Col, Table } from "antd";

const ModalPage = ({ modalClose }) => {
  const [clinic, setClinic] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    Axios.get(`${USER_SERVER}/api/clinic/view`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          response.data.forEach((lists) => {
            setClinic((state) => [
              ...state,
              {
                adtFrDd: lists.adtFrDd,
                hospTyTpCd: lists.hospTyTpCd,
                sidoNm: lists.sidoNm,
                sgguNm: lists.sgguNm,

                spclAdmTyCd: lists.spclAdmTyCd,
                telno: lists.telno,
                yadmNm: lists.yadmNm,
              },
            ]);
          });
        } else {
          alert("선별진료소 정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  const onCloseModal = (e) => {
    console.log("e.target: ", e.target);
    console.log("e.tarcurrentTargetget: ", e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  const columns = [
    {
      title: "운영 가능 일자",
      dataIndex: "adtFrDd",
      key: "adtFrDd",
    },
    {
      title: "선정 유형",
      dataIndex: "hospTyTpCd",
      key: "hospTyTpCd",
    },
    {
      title: "지역",
      dataIndex: "sidoNm",
      key: "sidoNm",
    },
    {
      title: " ",
      dataIndex: "sgguNm",
      key: "sgguNm",
    },

    {
      title: "기관 분류",
      dataIndex: "spclAdmTyCd",
      key: "spclAdmTyCd",
    },
    {
      title: "전화번호",
      dataIndex: "telno",
      key: "telno",
    },
    {
      title: "진료소 이름",
      dataIndex: "yadmNm",
      key: "yadmNm",
    },
  ];

  return (
    <div className="modal__container" onClick={onCloseModal}>
      <div className="modal">
        <div style={{ display: "flex", width: "100%" }}>
          <h1
            style={{
              fontFamily: "Droid Sans",
              fontSize: "2rem",
              margin: "0px",
              paddingLeft: "20px",
            }}
          >
            <strong style={{ color: "#f56a6a" }}>
              {" "}
              내 주변 선별진료소 확인하기
            </strong>
          </h1>

          {/* <button className="modal__button" onClick={modalClose}>
            {" "}
            X
          </button> */}
        </div>
        <p style={{ marginLeft: "20px" }}>
          * 선정 유형 : 국민안심병원 선정유형 (A: 일반 호흡기 환자 진료를 위한
          호흡기 전용 외래 설치 운영 병원, B: 호흡기 환자 전용 외래입원 진료가
          가능한 선별진료소 운영 병원)
        </p>
        <Table
          dataSource={clinic}
          columns={columns}
          pagination={{
            total: 1000,
            pageSize: 1000,
            hideOnSinglePage: true,
          }}
        />

        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <select onChange={onBoardChange}>
            {board.map((board, index) => (
              <option key={index} value={board.boardName}>
                {board.boardName}
              </option>
            ))}
          </select>

        </div> */}
      </div>
    </div>
  );
};

export default ModalPage;
