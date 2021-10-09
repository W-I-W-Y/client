import React, { useState, useEffect } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Content3() {
  const [coronaAbr, setCoronaAbr] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/corona`, { headers }).then(
      (response, index) => {
        console.log(response.data.abrCoronaDtos);
        if (response.data !== null) {
          response.data.abrCoronaDtos.forEach((lists) => {
            setCoronaAbr((state) => [
              ...state,
              {
                natDeathCnt: lists.natDeathCnt,
                natDefCnt: lists.natDefCnt,
                nationNm: lists.nationNm,
              },
            ]);
          });
        } else {
          alert("국외 코로나정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  console.log(coronaAbr);
  return (
    <section className="content-section" id="content-section-3">
      <h1>국외 발생동향</h1>
      <table className="tabel">
        <thead className="thead">
          <tr>
            <th style={{ textAlign: "center" }}>나라</th>
            <th style={{ textAlign: "center" }}>총 확진자</th>
            <th style={{ textAlign: "center" }}>총 사망자</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {coronaAbr.map((coronaAbr, index) => (
            <tr className="tabel-tr" key={index}>
              <td className="th-1">{coronaAbr.nationNm}</td>
              <td className="th-2">{coronaAbr.natDefCnt}</td>
              <td className="th-3">{coronaAbr.natDeathCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Content3;
