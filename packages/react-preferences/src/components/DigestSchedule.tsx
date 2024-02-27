import { usePreferences } from "@trycourier/react-hooks";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DigestSchedule } from "~/types";
import formatDigest, { toUpperCaseFirstLetter } from "~/utils/format_digest";

const DigestScheduleContainer = styled.div`
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

const StyledRadio = styled.input<{ checkedColor: string }>`
  height: 14px;
  width: 14px;
  margin-top: 4px !important;
  accent-color: ${({ checkedColor }) => checkedColor};
`;

const DigestSchedules: React.FunctionComponent<{
  schedules: DigestSchedule[];
  onScheduleChange: (scheduleId: string) => Promise<void>;
  checkedColor: string;
  topicId: string;
}> = ({ checkedColor, schedules, onScheduleChange, topicId }) => {
  const { recipientPreferences } = usePreferences();

  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  useEffect(() => {
    const defaultSchedule = schedules.find((s) => s.default);
    const userPreference = recipientPreferences?.find(
      (pref) => pref.templateId === topicId
    );
    if (
      userPreference?.digestSchedule &&
      schedules.find((s) => s.scheduleId === userPreference.digestSchedule)
    ) {
      setSelectedOption(userPreference.digestSchedule);
    } else {
      setSelectedOption(defaultSchedule?.scheduleId);
    }
  }, [recipientPreferences, schedules]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onScheduleChange(value);
  };

  return (
    <div>
      {schedules.map((schedule) => (
        <DigestScheduleContainer key={schedule.scheduleId}>
          <StyledRadio
            type="radio"
            value={schedule.scheduleId}
            checked={selectedOption === schedule.scheduleId}
            checkedColor={checkedColor}
            onChange={handleChange}
          />
          <div className="digest-details">
            <div className="digest-period">{formatDigest(schedule)}</div>
            <div className="digest-repetition">
              {toUpperCaseFirstLetter(schedule.repetition)}
            </div>
          </div>
        </DigestScheduleContainer>
      ))}
    </div>
  );
};

export default DigestSchedules;
