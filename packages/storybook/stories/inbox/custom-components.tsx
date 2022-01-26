import React from "react";

export const CustomContainer: React.FunctionComponent = (props) => {
  return <>{props.children}</>;
};

export const CustomHeader: React.FunctionComponent = () => {
  return <h1>Custom Header</h1>;
};

export const CustomFooter: React.FunctionComponent = () => {
  return <div>Custom Footer</div>;
};

export const CustomIcon: React.FunctionComponent = () => {
  return <div>Icon</div>;
};

export const CustomTabs: React.FunctionComponent = () => {
  return <div>No Tabs For You</div>;
};

export const CustomNoMessages: React.FunctionComponent = () => {
  return <div>No Messages</div>;
};

export const CustomBell: React.FunctionComponent = () => {
  return <div>Bell</div>;
};
