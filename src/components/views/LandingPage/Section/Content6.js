import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Content3() {
  const [coronaToday, setCoronaToday] = useState([]);
  const [vaccine, setVaccine] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/corona`, { headers }).then(
      (response, index) => {
        const d = new Date();
        if (response.data !== null) {
          setCoronaToday({
            defCnt: response.data.coronaTodayDTO.defCnt,
            isolClearCnt: response.data.coronaTodayDTO.isolClearCnt,
            isolIngCnt: response.data.coronaTodayDTO.isolIngCnt,
            deathCnt: response.data.coronaTodayDTO.deathCnt,
            incDec: response.data.coronaTodayDTO.incDec,
          });

          setVaccine({
            firstCnt: response.data.vaccineDTO.firstCnt,
            secondCnt: response.data.vaccineDTO.secondCnt,
            incFirstCnt: response.data.vaccineDTO.incFirstCnt,
            incSecondCnt: response.data.vaccineDTO.incSecondCnt,
          });
        } else {
          alert("코로나정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  return (
    <section className="content-section" id="content-section-3">
      <h1>당일 집계 현황</h1>
      <table className="tabel">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>확진자</th>
            <th style={{ textAlign: "center" }}>백신 접종(2차 완료)</th>
            <th style={{ textAlign: "center" }}>거리두기 단계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: "3rem" }}>
              <strong>{coronaToday.incDec}</strong> 명
            </td>
            <td style={{ fontSize: "3rem" }}>
              <strong>{vaccine.incSecondCnt}</strong> 명
            </td>
            <td style={{ fontSize: "3rem" }}>
              <strong>3</strong>단계
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Content3;
