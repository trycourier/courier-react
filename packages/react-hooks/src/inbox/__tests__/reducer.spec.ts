import { IMessage } from "@trycourier/react-provider";
import { IInboxMessagePreview } from "@trycourier/client-graphql";

import reducer, { initialState, mapMessage } from "../reducer";
import { initInbox, INBOX_INIT } from "../actions/init";
import { setView, INBOX_SET_VIEW } from "../actions/set-view";
import { toggleInbox, INBOX_TOGGLE } from "../actions/toggle-inbox";
import {
  setCurrentTab,
  INBOX_SET_CURRENT_TAB,
} from "../actions/set-current-tab";
import {
  fetchUnreadMessageCountDone,
  INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE,
} from "../actions/fetch-unread-message-count";
import {
  fetchMessagesPending,
  fetchMessagesError,
  fetchMessagesDone,
  INBOX_FETCH_MESSAGES,
  INBOX_FETCH_MESSAGES_ERROR,
  INBOX_FETCH_MESSAGES_PENDING,
  INBOX_FETCH_MESSAGES_DONE,
} from "../actions/fetch-messages";
import {
  markMessageRead,
  INBOX_MARK_MESSAGE_READ,
} from "../actions/mark-message-read";
import {
  markMessageUnread,
  INBOX_MARK_MESSAGE_UNREAD,
} from "../actions/mark-message-unread";

import { ITab } from "../types";
import { INBOX_NEW_MESSAGE, newMessage } from "../actions/new-message";

import { INBOX_MARK_ALL_READ, markAllRead } from "../actions/mark-all-read";
import {
  fetchMessageListsPending,
  fetchMessageListsDone,
  fetchMessageListsError,
  INBOX_FETCH_MESSAGE_LISTS,
  INBOX_FETCH_MESSAGE_LISTS_PENDING,
  INBOX_FETCH_MESSAGE_LISTS_ERROR,
  INBOX_FETCH_MESSAGE_LISTS_DONE,
} from "../actions/fetch-message-lists";

import {
  rehydrateMessages,
  INBOX_REHYDRATE_MESSAGES,
} from "../actions/rehydrate-messages";
import {
  INBOX_MARK_MESSAGE_OPENED,
  markMessageOpened,
} from "../actions/mark-message-opened";

const mockTab: ITab = {
  filters: {
    isRead: false,
  },
  label: "Unread",
  id: "unread",
};

const mockStartCursor = "mockStartCursor";
const mockMessage: IMessage = {
  messageId: "mockMessageId",
  created: new Date().toISOString(),
  title: "mockTitle",
  body: "mockBody",
};

const mockGraphMessage: IInboxMessagePreview = {
  messageId: "mockMessageId",
  created: new Date().toISOString(),
  title: "mockTitle",
  preview: "mockBody",
};

const mockGraphMessage2: IInboxMessagePreview = {
  messageId: "mockMessageId2",
  created: new Date().toISOString(),
  title: "mockTitle2",
  preview: "mockBody2",
};

const mockDate = new Date().getTime();

describe("inbox reducer", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern").setSystemTime(mockDate);
  });

  it("should set the initial state", () => {
    const state = reducer();
    expect(state).toEqual(initialState);
  });

  it(`action ${INBOX_INIT}`, () => {
    const state = reducer(
      initialState,
      initInbox({
        isOpen: true,
      })
    );

    expect(state).toEqual({
      ...initialState,
      isOpen: true,
    });
  });

  it(`action ${INBOX_SET_VIEW}`, () => {
    const state = reducer(initialState, setView("preferences"));

    expect(state).toEqual({
      ...initialState,
      view: "preferences",
    });
  });

  it(`action ${INBOX_TOGGLE}`, () => {
    const state = reducer(initialState, toggleInbox(true));

    expect(state).toEqual({
      ...initialState,
      isOpen: true,
    });

    const newState = reducer(state, toggleInbox());

    expect(newState).toEqual({
      ...initialState,
      isOpen: false,
    });
  });

  describe(`action ${INBOX_SET_CURRENT_TAB}`, () => {
    it(`without state`, () => {
      const state = reducer(initialState, setCurrentTab(mockTab));
      expect(state).toEqual({
        ...initialState,
        currentTab: mockTab,
      });
    });

    it(`with state`, () => {
      const mockTabState = {
        startCursor: mockStartCursor,
        messages: [mockMessage],
      };

      const myTab: ITab = {
        id: "my-mock-tab",
        label: "My Mock Tab",
        filters: {},
        state: mockTabState,
      };

      const state = reducer(initialState, setCurrentTab(myTab));
      expect(state).toEqual({
        ...initialState,
        ...mockTabState,
        currentTab: myTab,
      });
    });
  });

  it(`action ${INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE}`, () => {
    const state = reducer(initialState, fetchUnreadMessageCountDone(100));

    expect(state).toEqual({
      ...initialState,
      unreadMessageCount: 100,
    });
  });

  describe(`action ${INBOX_REHYDRATE_MESSAGES}`, () => {
    const mappedMessage = mapMessage(mockGraphMessage);
    const mappedMessage2 = mapMessage(mockGraphMessage2);

    it("will rehydrate without tabs", () => {
      const state = reducer(
        initialState,
        rehydrateMessages({
          messages: [mappedMessage],
          startCursor: "abc123",
          unreadMessageCount: 1,
        })
      );

      expect(state).toEqual({
        ...initialState,
        messages: [mappedMessage],
        startCursor: "abc123",
        unreadMessageCount: 1,
      });
    });

    it("will rehydrate with tabs", () => {
      const unreadTab = {
        ...mockTab,
        state: {
          messages: [],
        },
      };

      const allMessagesTab = {
        id: "all",
        label: "All Messages",
        filters: {},
        state: {},
      };

      const expectedTabs = [
        {
          ...unreadTab,
          state: {
            startCursor: "unreadStartCursor",
            messages: [mappedMessage],
          },
        },
        {
          ...allMessagesTab,
          state: {
            startCursor: "allMessagesStartCursor",
            messages: [mappedMessage2],
          },
        },
      ];
      const state = reducer(
        {
          ...initialState,
          tabs: [unreadTab, allMessagesTab],
        },
        rehydrateMessages({
          messages: [mappedMessage],
          tabs: expectedTabs,
          startCursor: "abc123",
          unreadMessageCount: 13,
        })
      );

      expect(state).toEqual({
        ...initialState,
        messages: [mappedMessage],
        tabs: expectedTabs,
        startCursor: "unreadStartCursor",
        unreadMessageCount: 13,
      });
    });

    it("will NOT rehydrate if tabs mismatch", () => {
      const unreadTab = {
        ...mockTab,
        state: {
          messages: [],
        },
      };

      const allMessagesTab = {
        id: "all",
        label: "All Messages",
        filters: {},
        state: {},
      };

      const state = reducer(
        {
          ...initialState,
          tabs: [unreadTab, allMessagesTab],
        },
        rehydrateMessages({
          messages: [mappedMessage],
          tabs: [
            {
              id: "badTabId",
              label: "badTab",
              filters: {},
            },
            {
              ...allMessagesTab,
              state: {
                startCursor: "allMessagesStartCursor",
                messages: [mappedMessage2],
              },
            },
          ],
          startCursor: "abc123",
          unreadMessageCount: 13,
        })
      );

      expect(state).toEqual({
        ...initialState,
        messages: [],
        tabs: [unreadTab, allMessagesTab],
        startCursor: undefined,
        unreadMessageCount: 0,
      });
    });

    it("will NOT rehydrate tabs in LS but not passed in", () => {
      const allMessagesTab = {
        id: "all",
        label: "All Messages",
        filters: {},
        state: {},
      };

      const state = reducer(
        {
          ...initialState,
        },
        rehydrateMessages({
          messages: [mappedMessage],
          tabs: [
            {
              ...allMessagesTab,
              state: {
                startCursor: "allMessagesStartCursor",
                messages: [mappedMessage2],
              },
            },
          ],
          startCursor: "abc123",
          unreadMessageCount: 13,
        })
      );

      expect(state).toEqual({
        ...initialState,
        messages: [],
        tabs: undefined,
        startCursor: undefined,
        unreadMessageCount: 0,
      });
    });
  });

  describe(`action ${INBOX_NEW_MESSAGE}`, () => {
    const mappedMessage = mapMessage(mockGraphMessage);

    it("will prepend the new message to the state", () => {
      const state = reducer(initialState, newMessage(mappedMessage));

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [mappedMessage],
      });
    });

    it("will prepend the new message to the state and update current tab if it exists", () => {
      const unreadTab = {
        ...mockTab,
        state: {
          messages: [],
        },
      };

      const allMessages = {
        id: "all",
        label: "All Messages",
        filters: {},
        state: {},
      };

      const state = reducer(
        {
          ...initialState,
          currentTab: unreadTab,
          tabs: [unreadTab, allMessages],
        },
        newMessage(mappedMessage)
      );

      const newCurrentTab = {
        ...unreadTab,
        state: {
          messages: [mappedMessage],
        },
      };

      expect(state).toEqual({
        ...initialState,
        currentTab: unreadTab,
        unreadMessageCount: 1,
        tabs: [
          newCurrentTab,
          {
            ...allMessages,
            state: {
              messages: [mappedMessage],
            },
          },
        ],
        messages: [mappedMessage],
      });
    });
  });

  describe(`action ${INBOX_FETCH_MESSAGES}`, () => {
    it(INBOX_FETCH_MESSAGES_PENDING, () => {
      const state = reducer(initialState, fetchMessagesPending());

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it(INBOX_FETCH_MESSAGES_ERROR, () => {
      const state = reducer(initialState, fetchMessagesError());

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    describe(INBOX_FETCH_MESSAGES_DONE, () => {
      it(`will not append if appendMessages === false`, () => {
        const state = reducer(
          initialState,
          fetchMessagesDone(
            {
              messages: [mockGraphMessage],
            },
            {
              searchParams: {
                filters: {},
              },
            }
          )
        );

        expect(state).toEqual({
          ...initialState,
          lastMessagesFetched: mockDate,
          messages: [mapMessage(mockGraphMessage)],
          isLoading: false,
        });
      });

      it(`will update currentTab with new messages`, () => {
        const state = reducer(
          {
            ...initialState,
            currentTab: mockTab,
          },
          fetchMessagesDone(
            {
              messages: [mockGraphMessage],
            },
            {
              tabId: mockTab.id,
              searchParams: {
                filters: {},
              },
            }
          )
        );

        expect(state).toEqual({
          ...initialState,
          lastMessagesFetched: mockDate,
          messages: [mapMessage(mockGraphMessage)],
          currentTab: mockTab,
          isLoading: false,
        });
      });

      it(`will append if appendMessages === true`, () => {
        const state = reducer(
          {
            ...initialState,
            messages: [mapMessage(mockGraphMessage)],
            isLoading: true,
          },
          fetchMessagesDone(
            {
              appendMessages: true,
              messages: [mockGraphMessage2],
            },
            {
              searchParams: {
                filters: {},
              },
            }
          )
        );

        expect(state).toEqual({
          ...initialState,
          lastMessagesFetched: mockDate,
          messages: [
            mapMessage(mockGraphMessage),
            mapMessage(mockGraphMessage2),
          ],
          isLoading: false,
        });
      });

      it(`will append messages to the right tab if the currentTab isn't the tab dispatched`, () => {
        const mockTabs: ITab[] = [
          mockTab,
          {
            filters: {},
            label: "All Messages",
            id: "all",
          },
        ];

        const state = reducer(
          {
            ...initialState,
            currentTab: mockTabs[0],
            tabs: mockTabs,
            messages: [mapMessage(mockGraphMessage)],
            isLoading: true,
          },
          fetchMessagesDone(
            {
              appendMessages: true,
              messages: [mockGraphMessage2],
            },
            {
              tabId: "all",
              searchParams: {
                filters: {},
              },
            }
          )
        );

        expect(state).toEqual({
          ...initialState,
          currentTab: mockTabs[0],
          lastMessagesFetched: mockDate,
          tabs: [
            mockTab,
            {
              ...mockTabs[1],
              state: {
                messages: [mapMessage(mockGraphMessage2)],
              },
            },
          ],
          messages: [mapMessage(mockGraphMessage)],
          isLoading: false,
        });
      });
    });
  });

  describe(`action ${INBOX_FETCH_MESSAGE_LISTS}`, () => {
    it(INBOX_FETCH_MESSAGE_LISTS_PENDING, () => {
      const state = reducer(initialState, fetchMessageListsPending());

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it(INBOX_FETCH_MESSAGE_LISTS_ERROR, () => {
      const state = reducer(initialState, fetchMessageListsError());

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    describe(INBOX_FETCH_MESSAGE_LISTS_DONE, () => {
      it(`will update currentTab and tabs with new messages`, () => {
        const mockTabs: ITab[] = [
          mockTab,
          {
            filters: {},
            label: "All Messages",
            id: "all",
          },
        ];

        const state = reducer(
          {
            ...initialState,
            currentTab: mockTab,
            tabs: mockTabs,
          },
          fetchMessageListsDone({
            unread: {
              messages: [mockGraphMessage],
            },
            all: {
              messages: [mockGraphMessage, mockGraphMessage2],
            },
          })
        );

        expect(state).toEqual({
          ...initialState,
          currentTab: mockTab,
          lastMessagesFetched: mockDate,
          messages: [mapMessage(mockGraphMessage)],
          tabs: [
            {
              ...mockTabs[0],
              state: {
                messages: [mapMessage(mockGraphMessage)],
              },
            },
            {
              ...mockTabs[1],
              state: {
                messages: [
                  mapMessage(mockGraphMessage),
                  mapMessage(mockGraphMessage2),
                ],
              },
            },
          ],
          isLoading: false,
        });
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_READ}`, () => {
    const mappedMessage = mapMessage(mockGraphMessage);
    const mappedMessage2 = mapMessage(mockGraphMessage2);

    const unreadTab = {
      ...mockTab,
      state: {
        messages: [mappedMessage, mappedMessage2],
      },
    };

    const allMessagesTab = {
      id: "all",
      label: "All Messages",
      filters: {},
      state: {
        messages: [mappedMessage, mappedMessage2],
      },
    };

    const randomTab = {
      id: "random",
      label: "Random",
      filters: {},
    };

    it("Without Tabs, will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mappedMessage],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      const readMessage = {
        ...mappedMessage,
        read: true,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [readMessage],
      });
    });

    it("On UNREAD Tab, will filter message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mappedMessage, mappedMessage2],
          currentTab: unreadTab,
          tabs: [unreadTab, allMessagesTab, randomTab],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [mappedMessage2],
        currentTab: {
          ...unreadTab,
          state: {
            messages: [mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [mappedMessage2],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [
                {
                  ...mappedMessage,
                  read: true,
                },
                mappedMessage2,
              ],
            },
          },
          randomTab,
        ],
      });
    });

    it("On ALL_MESSAGES Tab, will update message read timestamp and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mappedMessage, mappedMessage2],
          currentTab: allMessagesTab,
          tabs: [unreadTab, allMessagesTab, randomTab],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      const readTimestamp = state?.messages?.[0].read;
      expect(readTimestamp).toBeTruthy();

      const readMessage = {
        ...mappedMessage,
        read: true,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [readMessage, mappedMessage2],
        currentTab: {
          ...allMessagesTab,
          state: {
            messages: [readMessage, mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [mappedMessage2],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [
                {
                  ...mappedMessage,
                  read: true,
                },
                mappedMessage2,
              ],
            },
          },
          randomTab,
        ],
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_UNREAD}`, () => {
    const mappedReadMessage = mapMessage({
      ...mockGraphMessage,
      read: true,
    });
    const mappedMessage2 = mapMessage(mockGraphMessage2);

    const unreadTab = {
      ...mockTab,
      state: {
        messages: [],
      },
    };

    const allMessagesTab = {
      id: "all",
      label: "All Messages",
      filters: {},
      state: {
        messages: [mappedReadMessage, mappedMessage2],
      },
    };

    const randomTab = {
      id: "random",
      label: "Random",
      filters: {},
    };

    it("Without Tabs, will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedReadMessage],
        },
        markMessageUnread(mockGraphMessage.messageId)
      );

      const unreadMessage = {
        ...mappedReadMessage,
        read: undefined,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [unreadMessage],
      });
    });

    it("On ALL_MESSAGES Tab, will remove read timestamp and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedReadMessage, mappedMessage2],
          currentTab: allMessagesTab,
          tabs: [unreadTab, allMessagesTab, randomTab],
        },
        markMessageUnread(mockGraphMessage.messageId)
      );

      const readTimestamp = state?.messages?.[0].read;
      expect(readTimestamp).toBeFalsy();

      const unreadMessage = {
        ...mappedReadMessage,
        read: undefined,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [unreadMessage, mappedMessage2],
        currentTab: {
          ...allMessagesTab,
          state: {
            messages: [unreadMessage, mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [unreadMessage],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [unreadMessage, mappedMessage2],
            },
          },
          randomTab,
        ],
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_OPENED}`, () => {
    const mappedMessage = mapMessage(mockGraphMessage);
    const mappedMessage2 = mapMessage(mockGraphMessage2);

    const unreadTab = {
      ...mockTab,
      state: {
        messages: [mappedMessage],
      },
    };

    const allMessagesTab = {
      id: "all",
      label: "All Messages",
      filters: {},
      state: {
        messages: [mappedMessage, mappedMessage2],
      },
    };

    const openedMessage = {
      ...mappedMessage,
      opened: new Date(mockDate).toISOString(),
    };

    it("Without Tabs, will update message opened date", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedMessage],
        },
        markMessageOpened(mockGraphMessage.messageId)
      );

      expect(state).toEqual({
        ...initialState,
        messages: [openedMessage],
      });
    });

    it("With Tabs, will update message opened date on all tabs message exists", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedMessage, mappedMessage2],
          currentTab: allMessagesTab,
          tabs: [unreadTab, allMessagesTab],
        },
        markMessageOpened(mockGraphMessage.messageId)
      );

      expect(state).toEqual({
        ...initialState,
        messages: [openedMessage, mappedMessage2],
        currentTab: {
          ...allMessagesTab,
          state: {
            messages: [openedMessage, mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [openedMessage],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [openedMessage, mappedMessage2],
            },
          },
        ],
      });
    });
  });

  describe(`action ${INBOX_MARK_ALL_READ}`, () => {
    it("will mark all read without tabs", () => {
      const mappedMessage = mapMessage(mockGraphMessage);
      const mappedMessage2 = mapMessage(mockGraphMessage2);

      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 2,
          messages: [mappedMessage, mappedMessage2],
        },
        markAllRead()
      );

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        lastMarkedAllRead: mockDate,
        messages: [
          {
            ...mappedMessage,
            read: true,
          },
          {
            ...mappedMessage2,
            read: true,
          },
        ],
      });
    });

    it("will mark all as read on UNREAD tab", () => {
      const mappedMessage = mapMessage(mockGraphMessage);
      const mappedMessage2 = mapMessage(mockGraphMessage2);

      const unreadTab = {
        ...mockTab,
        state: {
          messages: [mappedMessage, mappedMessage2],
        },
      };

      const allMessagesTab = {
        id: "all",
        label: "All Messages",
        filters: {},
        state: {
          messages: [mappedMessage, mappedMessage2],
        },
      };

      const state = reducer(
        {
          ...initialState,
          currentTab: unreadTab,
          tabs: [unreadTab, allMessagesTab],
          unreadMessageCount: 2,
          messages: [mappedMessage, mappedMessage2],
        },
        markAllRead()
      );

      expect(state).toEqual({
        ...initialState,
        currentTab: unreadTab,
        unreadMessageCount: 0,
        lastMarkedAllRead: mockDate,
        messages: [],
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [
                {
                  ...mappedMessage,
                  read: true,
                },
                {
                  ...mappedMessage2,
                  read: true,
                },
              ],
            },
          },
        ],
      });
    });

    it("will mark all as read on ALL tab", () => {
      const mappedMessage = mapMessage(mockGraphMessage);
      const mappedMessage2 = mapMessage(mockGraphMessage2);

      const unreadTab = {
        ...mockTab,
        state: {
          messages: [mappedMessage, mappedMessage2],
        },
      };

      const allMessagesTab = {
        id: "all",
        label: "All Messages",
        filters: {},
        state: {
          messages: [mappedMessage, mappedMessage2],
        },
      };

      const state = reducer(
        {
          ...initialState,
          currentTab: allMessagesTab,
          tabs: [unreadTab, allMessagesTab],
          unreadMessageCount: 2,
          messages: [mappedMessage, mappedMessage2],
        },
        markAllRead()
      );

      const readMessages = [
        {
          ...mappedMessage,
          read: true,
        },
        {
          ...mappedMessage2,
          read: true,
        },
      ];

      expect(state).toEqual({
        ...initialState,
        currentTab: allMessagesTab,
        unreadMessageCount: 0,
        messages: readMessages,
        lastMarkedAllRead: mockDate,
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [
                {
                  ...mappedMessage,
                  read: true,
                },
                {
                  ...mappedMessage2,
                  read: true,
                },
              ],
            },
          },
        ],
      });
    });
  });
});
