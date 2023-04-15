import React, { useState } from "react";
import styled from "styled-components";

const DigestSheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px 0px;
  align-items: flex-start;

  .digest-details {
    display: flex;
    flex-direction: column;
    margin-left: 12px;

    .digest-period {
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      margin-bottom: 6px;
      font-weight: bold;
    }

    .digest-repetition {
      font-size: 12px;
      color: #73819b;
    }
  }
`;

const StyledCheckbox = styled.input<{ checkedColor: string }>`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  margin-top: 4px !important;
  accent-color: ${({ checkedColor }) => checkedColor};
`;

//TODO: Add update function once backend is setup
const DigestSchedule: React.FunctionComponent<{
  period: string;
  repetition;
  isActive: boolean;
  checkedColor: string;
}> = ({ period, repetition, isActive, checkedColor }) => {
  const [isChecked, setIsChecked] = useState(isActive);
  return (
    <DigestSheduleContainer>
      <StyledCheckbox
        type="checkbox"
        checked={isChecked}
        checkedColor={checkedColor}
        onClick={() => setIsChecked(!isChecked)}
      />
      <div className="digest-details">
        <div className="digest-period">{period}</div>
        <div className="digest-repetition">{repetition}</div>
      </div>
    </DigestSheduleContainer>
  );
};

export default DigestSchedule;
