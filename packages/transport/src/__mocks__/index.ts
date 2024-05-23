const connectMock = jest.fn();
const renewSessionMock = jest.fn();

export const CourierTransport = jest.fn().mockImplementation(() => {
  return {
    connect: connectMock,
    renewSession: renewSessionMock,
  };
});

const transportMock = jest.fn();
export const Transport = transportMock;
