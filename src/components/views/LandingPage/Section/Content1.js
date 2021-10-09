import React, { useEffect, useState, PureComponent } from "react";
import { Row, Col } from "antd";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Content1() {
  const demoUrl = "https://codesandbox.io/s/line-chart-double-y-axes-4j73x";
  const [coronaToday, setCoronaToday] = useState([]);
  const [coronaWeek, setCoronaWeek] = useState([]);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/corona`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          console.log("data check");
          console.log(response.data);

          response.data.coronaWeekDTOS.forEach((lists) => {
            setCoronaWeek((state) => [
              ...state,
              {
                defCnt: lists.defCnt,
                stdDay: lists.stdDay,
              },
            ]);
          });

          setCoronaToday({
            defCnt: response.data.coronaTodayDTO.defCnt,
            isolClearCnt: response.data.coronaTodayDTO.isolClearCnt,
            isolIngCnt: response.data.coronaTodayDTO.isolIngCnt,
            deathCnt: response.data.coronaTodayDTO.deathCnt,
            incDec: response.data.coronaTodayDTO.incDec,
          });
        } else {
          alert("코로나정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);
  console.log(coronaWeek);
  return (
    <section
      className="content-section"
      id="content-section-1"
      style={{ display: "block", justifyContent: "center" }}
    >
      <p
        style={{
          fontFamily: "Droid Sans",
          fontSize: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <stiong>코로나 확진자 현황</stiong>
      </p>
      <div className="two-content" style={{ padding: "10px" }}>
        <div className="coronaboard">
          <Row style={{ display: "flex" }}>
            <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
              <div>
                확진환자
                <p style={{ color: "blue", textAlign: "center" }}>
                  {coronaToday.defCnt}
                </p>
              </div>
            </Col>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                격리해제
                <p style={{ color: "red", textAlign: "center" }}>
                  {coronaToday.isolClearCnt}
                </p>
              </div>
            </Col>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                격리중
                <p style={{ color: "green", textAlign: "center" }}>
                  {coronaToday.isolIngCnt}
                </p>
              </div>
            </Col>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                사망
                <p style={{ color: "black", textAlign: "center" }}>
                  {coronaToday.deathCnt}
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="dailyCovidStatus" style={{ width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stdDay" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default Content1;
