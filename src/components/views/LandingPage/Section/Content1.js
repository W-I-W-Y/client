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

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/corona`).then((response, index) => {
      const day = new Date();
      const sunday = day.getTime() - 86400000 * 7;
      console.log(sunday);
      day.setTime(sunday);
      const result = [day.toISOString().slice(5, 10)];

      console.log(result);
      if (response.data !== null) {
        console.log("data check");
        console.log(response.data);

        response.data.coronaWeekDTOS.forEach((lists) => {
          day.setTime(day.getTime() + 86400000);

          setCoronaWeek((state) => [
            ...state,
            {
              incDec: lists.incDec,
              stdDay: day.toISOString().slice(5, 10),
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
    });
  }, []);

  console.log(coronaWeek);

  return (
    <section
      className="content-section"
      id="content-section-1"
      style={{ display: "block", justifyContent: "center" }}
    >
      <div className="two-content" style={{ padding: "10px" }}>
        <div className="coronaboard">
          <Row style={{ display: "flex" }}>
            <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                확진환자
                <p style={{ color: "blue", textAlign: "center", margin: "0" }}>
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
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                격리해제
                <p style={{ color: "red", textAlign: "center", margin: "0" }}>
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
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                격리중
                <p style={{ color: "green", textAlign: "center", margin: "0" }}>
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
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                사망
                <p style={{ color: "black", textAlign: "center", margin: "0" }}>
                  {coronaToday.deathCnt}
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="dailyCovidStatus" style={{ width: "100%" }}>
          <ResponsiveContainer width="97%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={coronaWeek}
              margin={{
                top: 10,
                right: 0,
                left: -10,
                bottom: 10,
              }}
              viewBox={{
                x: 0,
                y: 0,
                width: 500,
                height: 500,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stdDay" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="incDec"
                stroke="#8884d8"
                activeDot={{ r: 10 }}
              />
              {/* <Line
                yAxisId="right"
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default Content1;
