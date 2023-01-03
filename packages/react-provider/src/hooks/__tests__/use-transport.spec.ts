import { renderHook } from "@testing-library/react-hooks"; // will attempt to auto-detect
import { Transport } from "../../transports/base";
import useTransport from "../use-transport";

import { WS } from "../../ws";

const ws = new WS({});

const mockConnect = ws.connect as jest.Mock;
const mockRenewSession = ws.renewSession as jest.Mock;

jest.mock("../../ws");
describe("useTransport", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("will throw an error if missing auth and clientkey", () => {
    expect.assertions(1);
    try {
      const { result } = renderHook(() =>
        useTransport({
          clientSourceId: "abc123",
        })
      );

      if (result.error) {
        throw result.error;
      }
    } catch (ex) {
      expect(String(ex)).toBe("Error: Missing ClientKey or Authorization");
    }
  });

  test("will return the same transport passed in", () => {
    const transport = new Transport();
    const { result } = renderHook(() =>
      useTransport({
        transport,
      })
    );

    expect(result.current).toEqual(transport);
  });

  test("will create a new transport if one is not provided", () => {
    const { result } = renderHook(() =>
      useTransport({
        clientSourceId: "mockClientSourceId",
        authorization: "mockAuth",
      })
    );

    expect(result.current).toBeTruthy();
    expect(mockConnect.mock.calls.length).toEqual(1);
  });

  test("will call renewSession if a new token is provided", () => {
    let authorization =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6NzBmNmE0ZjQtMjkwNy00NTE4LWI4ZjMtYjljZmFiMjI0NzY0IGluYm94OnJlYWQ6bWVzc2FnZXMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvcHJvZHVjdGlvbiIsInRlbmFudF9pZCI6Ijc2ODI1MWNmLTNlYjgtNDI2YS05MmViLWZhYTBlNzY3ODc2OCIsImlhdCI6MTY3MjI1NzY1OSwianRpIjoiYmJlMDMyMmMtZWY4Mi00M2FkLWI3NGMtOGZlYWNiNTczYTY0In0.Xs_yd8IhdNORK8LyleS10FDLQbb4sXkCtGHPq7tUGa4";

    const { result, rerender } = renderHook(() =>
      useTransport({
        clientSourceId: "mockClientSourceId",
        authorization,
      })
    );

    expect(result.current).toBeTruthy();
    expect(mockConnect.mock.calls.length).toEqual(1);

    authorization =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6NzBmNmE0ZjQtMjkwNy00NTE4LWI4ZjMtYjljZmFiMjI0NzY0IGluYm94OnJlYWQ6bWVzc2FnZXMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvcHJvZHVjdGlvbiIsInRlbmFudF9pZCI6Ijc2ODI1MWNmLTNlYjgtNDI2YS05MmViLWZhYTBlNzY3ODc2OCIsImlhdCI6MTY3Mjc4MDE5MSwianRpIjoiMzU1NmU1OTYtNjljZi00NjdiLTg1YjMtNDk5ZjZmYzk2YjVhIn0.peUty0F94bhulmD4HS-7H7N3-HI31mIvU8jLFBEpUgM";

    rerender();
    expect(mockRenewSession.mock.calls.length).toEqual(1);
  });

  test("will NOT call renewSession if a new token is provided but the scope changes", () => {
    let authorization =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6NzBmNmE0ZjQtMjkwNy00NTE4LWI4ZjMtYjljZmFiMjI0NzY0IGluYm94OnJlYWQ6bWVzc2FnZXMiLCJ0ZW5hbnRfc2NvcGUiOiJwdWJsaXNoZWQvcHJvZHVjdGlvbiIsInRlbmFudF9pZCI6Ijc2ODI1MWNmLTNlYjgtNDI2YS05MmViLWZhYTBlNzY3ODc2OCIsImlhdCI6MTY3MjI1NzY1OSwianRpIjoiYmJlMDMyMmMtZWY4Mi00M2FkLWI3NGMtOGZlYWNiNTczYTY0In0.Xs_yd8IhdNORK8LyleS10FDLQbb4sXkCtGHPq7tUGa4";

    const { result, rerender } = renderHook(() =>
      useTransport({
        clientSourceId: "mockClientSourceId",
        authorization,
      })
    );

    expect(result.current).toBeTruthy();
    expect(mockConnect.mock.calls.length).toEqual(1);

    authorization =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6YmxhaCBpbmJveDpyZWFkOm1lc3NhZ2VzIiwidGVuYW50X3Njb3BlIjoicHVibGlzaGVkL3Byb2R1Y3Rpb24iLCJ0ZW5hbnRfaWQiOiI3NjgyNTFjZi0zZWI4LTQyNmEtOTJlYi1mYWEwZTc2Nzg3NjgiLCJpYXQiOjE2NzI3ODIwNzYsImp0aSI6ImJjZjRiN2QzLWMyNDktNDQzNC04ZTQ0LWFjMTYxY2U0NTRiZCJ9.J7k0OQ1qfFR5MpdoP13mCusQWejpx7VB6Z6A194RxU8";

    rerender();
    expect(mockRenewSession.mock.calls.length).toEqual(0);
    expect(mockConnect.mock.calls.length).toEqual(2);
  });
});
