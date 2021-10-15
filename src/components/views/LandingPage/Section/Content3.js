import React, { useState, useEffect } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Content3() {
  const [coronaAbr, setCoronaAbr] = useState([]);
  const [numberOfItem, setNumberOfItem] = useState(10);

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

  const handleNumber = () => {
    setNumberOfItem(numberOfItem + 10);
  };

  return (
    <section className="content-section" id="content-section-3">
      <table className="tabel">
        <thead className="thead">
          <tr>
            <th style={{ textAlign: "center" }}>나라</th>
            <th style={{ textAlign: "center" }}>총 확진자</th>
            <th style={{ textAlign: "center" }}>총 사망자</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {coronaAbr.slice(0, numberOfItem).map((coronaAbr, index) => (
            <tr className="tabel-tr" key={index}>
              <td className="th-1">
                <img
                  src={require(`../../../../images/country/${coronaAbr.nationNm}.png`)}
                  style={{ width: "30px", height: "20px", marginRight: "20px" }}
                ></img>
                {coronaAbr.nationNm}
              </td>
              <td className="th-2">{coronaAbr.natDefCnt}</td>
              <td className="th-3">{coronaAbr.natDeathCnt}</td>
            </tr>
          ))}
        </tbody>
        <div style={{ width: "298%", padding: "0" }}>
          {numberOfItem > coronaAbr.length ? (
            <p></p>
          ) : (
            <button
              onClick={handleNumber}
              style={{ width: "100%", boxShadow: "none" }}
            >
              {" "}
              +10 MORE
            </button>
          )}
        </div>
      </table>
    </section>
  );
}

export default Content3;
