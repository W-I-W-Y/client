import React, { useEffect, useState, PureComponent } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Text2() {
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);

  const handlestep = (num) => {
    if (num === 1) {
      setOne(true);
      setTwo(false);
      setThree(false);
      setFour(false);
    } else if (num === 2) {
      setOne(false);
      setTwo(true);
      setThree(false);
      setFour(false);
    } else if (num === 3) {
      setOne(false);
      setTwo(false);
      setThree(true);
      setFour(false);
    } else {
      setOne(false);
      setTwo(false);
      setThree(false);
      setFour(true);
    }
  };

  return (
    <section
      className="content-section"
      id="content-section-1"
      style={{ display: "block", justifyContent: "center" }}
    >
      <div className="two-content" style={{ padding: "10px", height: "430px" }}>
        <div
          className="coronaboard"
          style={{
            borderRadius: "0px",
            border: "none",
            backgroundColor: "#ffeef9",
          }}
        >
          <Row style={{ display: "flex" }}>
            {one ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(1);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ?????????
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(1);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ?????????
                </p>
              </Col>
            )}

            {two ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(2);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ?????????
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(2);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ?????????
                </p>
              </Col>
            )}
            {three ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(3);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  ?????????????????????
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(3);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  ?????????????????????
                </p>
              </Col>
            )}
            {four ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(4);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ??????
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => {
                  handlestep(4);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ??????
                </p>
              </Col>
            )}
          </Row>
        </div>

        {one && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>????????? </strong>
            ??????
            <br />
            <strong>?????? </strong> 6,600?????? ??? <br />
            <strong>???????????? </strong>
            2???
            <br /> <strong>???????????? </strong>
            21???
            <br /> <strong>??????</strong>
            -75?????15??? (6??????)
            <br /> <strong>??????</strong>2???8??? (5???)
          </div>
        )}
        {two && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>????????? </strong>
            ??????
            <br />
            <strong>?????? </strong>
            2,000?????? ??? <br />
            <strong>???????????? </strong>
            2???
            <br /> <strong>???????????? </strong>
            8~12???
            <br /> <strong>??????</strong>
            2???8??? (6??????)
            <br /> <strong>??????</strong>
            2???8??? (6??????)
          </div>
        )}
        {three && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>????????? </strong>
            ??????
            <br />
            <strong>?????? </strong>
            701?????? ??? <br />
            <strong>???????????? </strong>
            1???(??????????????? ?????? ????????????)
            <br /> <strong>???????????? </strong>
            -
            <br /> <strong>??????</strong>
            -20??? (24??????)
            <br /> <strong>??????</strong>2???8??? (4.5??????)
          </div>
        )}
        {four && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>????????? </strong>
            ??????/??????
            <br />
            <strong>?????? </strong> 6,600?????? ??? <br />
            <strong>???????????? </strong>
            2???
            <br /> <strong>???????????? </strong>
            21???
            <br /> <strong>??????</strong>
            -75?????15??? (6??????)
            <br /> <strong>??????</strong>2???8??? (5???)
          </div>
        )}
      </div>
    </section>
  );
}

export default Text2;
