export const MESSAGES = {
  data: {
    messages: {
      nodes: [
        {
          id: "123",
          messageId: "1-6055153c-c0af468a3ebe8cb79665f556",
          created: "2021-03-19T21:18:52.271Z",
          content: {
            title: "Template Published",
            body: "Weekly Check-In was recently published",
            data: {
              clickAction:
                "/designer/notifications/BFD3HKDEZR4478MBV5ZTGHWXXEDP",
              tenantId: "7aff2747-d1bb-4f47-9476-3eae1646ba02",
              triggeredBy: "Google_103278594813491371949",
            },
            __typename: "Content",
          },
          __typename: "Messages",
        },
      ],
    },
  },
};

export const MESSAGE_COUNT = {
  data: { messageCount: 1 },
  extensions: {
    tracing: {
      version: 1,
      startTime: "2021-04-22T21:40:40.973Z",
      endTime: "2021-04-22T21:40:40.994Z",
      duration: 21310976,
      execution: {
        resolvers: [
          {
            path: ["messageCount"],
            parentType: "Query",
            fieldName: "messageCount",
            returnType: "Int!",
            startOffset: 289078,
            duration: 20971547,
          },
        ],
      },
    },
  },
};
