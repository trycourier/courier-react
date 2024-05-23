export const mockConnect = jest.fn();
export const mockSend = jest.fn();
export const mockRenewSession = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {
    connect: mockConnect,
    send: mockSend,
    renewSession: mockRenewSession,
  };
});

export const WS = mock;
