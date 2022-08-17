import React from "react";
import classNames from "classnames";
import { Container, Tab } from "./styled";
import { InboxProps, ITab } from "~/types";

const TabList: React.FunctionComponent<{
  currentTab?: ITab;
  isLoading?: boolean;
  labels?: InboxProps["labels"];
  tabs?: ITab[];
  setCurrentTab: (newTab: ITab) => void;
}> = ({ isLoading, tabs, currentTab, setCurrentTab, labels }) => {
  const handleOnChange = (newTab) => (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentTab(newTab);
  };

  if (!tabs?.length) {
    return null;
  }

  return (
    <Container>
      {tabs?.map((tab, index) => (
        <Tab
          key={tab.id}
          className={classNames({
            active: currentTab?.id === tab.id,
          })}
          disabled={isLoading}
          onClick={handleOnChange(tab)}
        >
          {labels?.tabs?.[index] ?? tab.label}
        </Tab>
      ))}
    </Container>
  );
};

export default TabList;
