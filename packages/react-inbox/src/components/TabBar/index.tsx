import React, { useMemo } from "react";
import classNames from "classnames";
import { Container, Tab } from "./styled";

const TabBar: React.FunctionComponent<{
  activeTab: string;
  onChange: (newTab: string) => void;
}> = ({ activeTab, onChange }) => {
  const handleOnChange = (newTab: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    onChange(newTab);
  };

  const tabs = useMemo(
    () => [
      {
        label: "Unread",
        id: "unread",
      },
      {
        label: "All Messages",
        id: "all",
      },
    ],
    []
  );

  return (
    <Container>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          className={classNames({
            active: activeTab === tab.id,
          })}
          onClick={handleOnChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </Container>
  );
};

export default TabBar;
