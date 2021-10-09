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
  const demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";
  const [vaccine, setVaccine] = useState([]);
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
          console.log(response.data.vaccineDTO);

          setVaccine({
            firstCnt: response.data.vaccineDTO.firstCnt,
            secondCnt: response.data.vaccineDTO.secondCnt,
            incFirstCnt: response.data.vaccineDTO.incFirstCnt,
            incSecondCnt: response.data.vaccineDTO.incSecondCnt,
          });
        } else {
          alert("백신 정보를 가져오는데 실패했습니다.");
        }
      }
    );
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
              <div style={{ textAlign: "center" }}>
                1차 접종
                <p style={{ color: "blue", textAlign: "center" }}>
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
              <div style={{ textAlign: "center" }}>
                2차 접종
                <p style={{ color: "red", textAlign: "center" }}>
                  {vaccine.secondCnt}
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="vaccineCovidStatus" style={{ width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default Content4;
