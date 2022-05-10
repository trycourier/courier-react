import React from "react";
import classNames from "classnames";
import { Container, Tab } from "./styled";
import { useInbox } from "@trycourier/react-hooks";

const TabList: React.FunctionComponent = () => {
  const { setCurrentTab, currentTab, tabs } = useInbox();

  const handleOnChange = (newTab) => (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentTab(newTab);
  };

  return (
    <Container>
      {tabs?.map((tab) => (
        <Tab
          key={tab.id}
          className={classNames({
            active: currentTab?.id === tab.id,
          })}
          onClick={handleOnChange(tab)}
        >
          {tab.label}
        </Tab>
      ))}
    </Container>
  );
};

export default TabList;
