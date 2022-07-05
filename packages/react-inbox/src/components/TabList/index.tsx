import React from "react";
import classNames from "classnames";
import { Container, Tab } from "./styled";
import { useInbox } from "@trycourier/react-hooks";
import { InboxProps, ITab } from "~/types";

const TabList: React.FunctionComponent<{
  tabs?: ITab[];
  currentTab?: ITab;
  labels?: InboxProps["labels"];
}> = ({ tabs, currentTab, labels }) => {
  const { setCurrentTab } = useInbox();

  const handleOnChange = (newTab) => (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentTab(newTab);
  };

  return (
    <Container>
      {tabs?.map((tab, index) => (
        <Tab
          key={tab.id}
          className={classNames({
            active: currentTab?.id === tab.id,
          })}
          onClick={handleOnChange(tab)}
        >
          {labels?.tabs?.[index] ?? tab.label}
        </Tab>
      ))}
    </Container>
  );
};

export default TabList;
