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

  if (action.type === "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE") {
    next({
      type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE",
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
              title: "Unread Message",
              preview: "This Message is Unread",
            },
            {
              messageId: 456,
              created: "2021-04-06T18:02:28.065Z",
              read: "2021-04-06T18:02:28.065Z",
              title: "Read Message",
              preview: "This Message is Read",
            },
            {
              messageId: 789,
              created: "2021-04-06T18:02:28.065Z",
              title: "Blocks",
              preview: "I'm a text block with 1 action",
              actions: [
                {
                  type: "action",
                  href: "https://www.courier.com",
                  content: "Click Me",
                },
              ],
            },
            {
              messageId: 790,
              created: "2021-04-06T18:02:28.065Z",
              title: "Blocks",
              preview: "I'm a text block with 2 actions",
              actions: [
                {
                  type: "action",
                  href: "https://www.courier.com",
                  content: "Approve",
                },
                {
                  type: "action",
                  href: "https://www.courier.com",
                  content: "Reject",
                },
              ],
            },
            {
              messageId: 791,
              created: "2021-04-06T18:02:28.065Z",
              title: "Blocks",
              preview: "I'm a text block with 2 actions and custom color",
              actions: [
                {
                  type: "action",
                  href: "https://www.courier.com",
                  background_color: "red",
                  content: "Approve",
                },
                {
                  type: "action",
                  background_color: "blue",
                  href: "https://www.courier.com",
                  content: "Reject",
                },
              ],
            },
            {
              messageId: 78910,
              created: "2021-04-06T18:02:28.065Z",
              title: "Markdown",
              preview:
                "I can understand *markdown* **woooo** [click here](https://www.courier.com)",
            },
          ],
        },
      });
    }, 1000);

    return;
  }
  next(action);
};
