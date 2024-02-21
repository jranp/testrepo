/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomizedTables from "./TableContent";
import { useState } from "react";

const bodyStyle = css`
  display: flex;
  height: 952px;
  width: 100%;
  padding: 40px 0px 80px 0px;
  flex-direction: column;
  align-items: center;
  background: var(--gray-100, #f6f6f9);
  gap: 24px;
`;

const topicStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1120px;
`;

const inputStyle = css`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 10px;
  width: 170px;
  color: rgba(123, 126, 143, 1);
  background-color: rgba(255, 255, 255, 1);
`;

const fontStyle = css`
  color: rgba(42, 46, 63, 1);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin: 0;
`;

const topicInputStyle = css`
  display: flex;
  gap: 15px;
`;

const Body = ({ setIsProfilePage }) => {
  const [booked, setbooked] = useState("");

  // ส่ง booked ที่เป็น State เข้าไป ใน <CustomizedTables />
  return (
    <div className="container_body" css={bodyStyle}>
      <div className="section_topic" css={topicStyle}>
        <h3 css={fontStyle}>Booking List</h3>

        <div className="topic_input" css={topicInputStyle}>
          <input
            type="text"
            placeholder="Search..."
            css={inputStyle}
            onChange={(event) => setbooked(event.target.value)}
            value={booked}
          />

          <select className="dropdown" css={inputStyle}>
            <option value="">All status</option>
            <option value="success">Success</option>
            <option value="inService">In service</option>
            <option value="waitingService">Waiting for service</option>
            <option value="waitingConfirm">Waiting for confirm</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>
      <div
        className="section_table"
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <CustomizedTables
          searchbooking={booked}
          setIsProfilePage={setIsProfilePage}
        />
      </div>
    </div>
  );
};

export default Body;
