export default () => (next) => (action) => {
  if (action.type === "inbox/INIT") {
    next({
      ...action,
      payload: {
        ...action.payload,
        isLoading: true,
      },
    });
    return;
  }

  if (action.type === "inbox/SET_UNREAD_MESSAGE_COUNT") {
    next({
      type: action.type + "/DONE",
      payload: 2,
    });
    return;
  }

  if (action.type === "inbox/FETCH_MESSAGES") {
    next({
      type: action.type + "/PENDING",
    });

    setTimeout(() => {
      next({
        type: action.type + "/DONE",
        payload: {
          appendMessages: false,
          messages: [
            {
              messageId: 123,
              created: "2021-04-06T18:02:28.065Z",
              read: false,
              content: {
                trackingIds: {
                  readTrackingId: 123,
                  unreadTrackingId: 123,
                },
                title: "Unread Message",
                body: "This Message is Unread",
              },
            },
            {
              messageId: 456,
              created: "2021-04-06T18:02:28.065Z",
              read: true,
              content: {
                trackingIds: {
                  readTrackingId: 123,
                  unreadTrackingId: 123,
                },
                title: "Read Message",
                body: "This Message is Read",
              },
            },
            {
              messageId: 789,
              created: "2021-04-06T18:02:28.065Z",
              read: false,
              content: {
                trackingIds: {
                  readTrackingId: 123,
                  unreadTrackingId: 123,
                },
                title: "Blocks",
                blocks: [
                  {
                    type: "text",
                    text: "I'm a text block",
                  },
                  {
                    type: "action",
                    url: "https://www.courier.com",
                    text: "Click Me",
                  },
                ],
              },
            },
            {
              messageId: 789,
              created: "2021-04-06T18:02:28.065Z",
              read: false,
              content: {
                trackingIds: {
                  readTrackingId: 123,
                  unreadTrackingId: 123,
                },
                title: "Markdown",
                blocks: [
                  {
                    type: "text",
                    text:
                      "I can understand *markdown* **woooo** [click here](https://www.courier.com)",
                  },
                ],
              },
            },
          ],
        },
      });
    }, 1000);

    return;
  }
  next(action);
};
