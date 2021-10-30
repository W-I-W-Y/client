import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Content6() {
  const [coronaToday, setCoronaToday] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [count, setCount] = useState("0");
  const [count2, setCount2] = useState("0");

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/corona`).then((response, index) => {
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

      let start = 0;
      let start2 = 0;

      let timer = setInterval(() => {
        if (
          start >=
          (response.data.coronaTodayDTO.incDec / 100).toFixed(0) * 100
        ) {
          start += 1;
        } else {
          start += 100;
        }
        setCount(start);
        if (start === response.data.coronaTodayDTO.incDec) clearInterval(timer);
      }, 50);

      let timer2 = setInterval(() => {
        if (
          start2 >=
          Math.floor(response.data.vaccineDTO.incSecondCnt / 10000) * 10000
        ) {
          if (
            start2 -
              Math.floor(response.data.vaccineDTO.incSecondCnt / 10000) *
                10000 >=
            Math.floor(
              (response.data.vaccineDTO.incSecondCnt -
                Math.floor(response.data.vaccineDTO.incSecondCnt / 10000) *
                  10000) /
                100
            ) *
              100
          ) {
            start2 += 1;
          } else {
            start2 += 100;
          }
        } else {
          start2 += 10000;
        }
        setCount2(start2);
        if (start2 === response.data.vaccineDTO.incSecondCnt)
          clearInterval(timer2);
      }, 5);
    });
  }, []);

  return (
    <section className="content-section" id="content-section-3">
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
              <strong>{count}</strong> 명
            </td>
            <td style={{ fontSize: "3rem" }}>
              <strong>{count2}</strong> 명
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

export default Content6;
