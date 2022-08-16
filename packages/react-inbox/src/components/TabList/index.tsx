import React from "react";
import classNames from "classnames";
import { Container, Tab } from "./styled";
import { useInbox } from "@trycourier/react-hooks";
import { InboxProps, ITab } from "~/types";

const TabList: React.FunctionComponent<{
  currentTab?: ITab;
  isLoading?: boolean;
  labels?: InboxProps["labels"];
  tabs?: ITab[];
}> = ({ isLoading, tabs, currentTab, labels }) => {
  const { setCurrentTab } = useInbox();

  const handleOnChange = (newTab) => (event: React.MouseEvent) => {
    event.preventDefault();
    if ((window as any).DEBUG_COURIER) {
      console.log("COURIER_DEBUG:", "isLoading - ", isLoading);
      console.log(
        "COURIER_DEBUG:",
        "tab - ",
        JSON.parse(JSON.stringify(newTab))
      );
    }

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
