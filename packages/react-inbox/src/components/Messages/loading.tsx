import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Contents } from "../Message/styled";

const MessageSkeleton: React.FunctionComponent = () => {
  return (
    <Container>
      <Skeleton
        circle={true}
        height={35}
        width={35}
        style={{ marginRight: 12 }}
      />
      <Contents style={{ width: "100%" }}>
        <Skeleton count={2} />
      </Contents>
      <div style={{ width: "100px", marginLeft: 12 }}>
        <Skeleton count={1} height={20} style={{ marginTop: -4 }} />
      </div>
    </Container>
  );
};

const Loading: React.FunctionComponent = () => {
  return (
    <>
      <MessageSkeleton />
      <MessageSkeleton />
    </>
  );
};

export default Loading;
