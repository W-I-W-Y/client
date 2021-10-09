import React from "react";

function Content3() {
  return (
    <section className="content-section" id="content-section-3">
      <h1>당일 집계 현황</h1>
      <table className="tabel">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>확진자</th>
            <th style={{ textAlign: "center" }}>백신 접종</th>
            <th style={{ textAlign: "center" }}> 거리두기 단계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: "3rem" }}>
              <strong>123</strong> 명
            </td>
            <td style={{ fontSize: "3rem" }}>
              <strong>1232</strong> 명
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
