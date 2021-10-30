import React, { useEffect, useState, PureComponent } from "react";
import { Row, Col } from "antd";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function Content4() {
  const demoUrl = "https://codesandbox.io/s/stacked-bar-chart-s47i2";
  const [vaccine, setVaccine] = useState([]);
  const [vaccineChart, setVaccineChart] = useState([]);

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/corona`).then((response, index) => {
      const day = new Date();
      const sunday = day.getTime() - 86400000 * 7;
      console.log(sunday);
      day.setTime(sunday);
      const result = [day.toISOString().slice(5, 10)];

      if (response.data !== null) {
        response.data.vaccineChartDTOS.forEach((lists) => {
          day.setTime(day.getTime() + 86400000);

          setVaccineChart((state) => [
            ...state,
            {
              incFirstCnt: lists.incFirstCnt,
              incSecondCnt: lists.incSecondCnt,
              stdDay: day.toISOString().slice(5, 10),
            },
          ]);
        });

        setVaccine({
          firstCnt: response.data.vaccineDTO.firstCnt,
          secondCnt: response.data.vaccineDTO.secondCnt,
          incFirstCnt: response.data.vaccineDTO.incFirstCnt,
          incSecondCnt: response.data.vaccineDTO.incSecondCnt,
        });
      } else {
        alert("백신 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <section
      className="content-section"
      id="content-section-4"
      style={{ display: "block", justifyContent: "center" }}
    >
      {/* <p
        style={{
          fontFamily: "Droid Sans",
          fontSize: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <stiong>백신 접종 현황</stiong>
      </p> */}
      <div className="two-content" style={{ padding: "10px" }}>
        <div className="coronaboard">
          <Row style={{ display: "flex" }}>
            <Col
              span={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                1차 접종
                <p style={{ color: "blue", textAlign: "center", margin: "0" }}>
                  {vaccine.firstCnt}
                </p>
              </div>
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                2차 접종
                <p style={{ color: "red", textAlign: "center", margin: "0" }}>
                  {vaccine.secondCnt}
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="vaccineCovidStatus" style={{ width: "100%" }}>
          <p>1차 접종</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              width={500}
              height={200}
              data={vaccineChart}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stdDay" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="incFirstCnt"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p>2차 접종</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              width={500}
              height={200}
              data={vaccineChart}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stdDay" />
              <YAxis />
              <Tooltip />
              <Area
                connectNulls
                type="monotone"
                dataKey="incSecondCnt"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default Content4;
