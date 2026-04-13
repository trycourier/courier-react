import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { CourierProvider } from "@trycourier/react-provider";
import usePreferences from "../use-preferences";

jest.mock("@trycourier/transport", () => ({
  CourierTransport: jest.fn().mockImplementation(() => ({
    listen: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    closeConnection: jest.fn(),
    keepAlive: jest.fn(),
    onReconnection: jest.fn(),
    intercept: jest.fn(),
    renewSession: jest.fn(),
    send: jest.fn(),
  })),
}));

const CLIENT_KEY = process.env.CLIENT_KEY;
const USER_ID = process.env.USER_ID;
const TOPIC_ID = process.env.TOPIC_ID;
const hasCredentials = !!(CLIENT_KEY && USER_ID);

const wrapper: React.FC = ({ children }) => (
  <CourierProvider clientKey={CLIENT_KEY!} userId={USER_ID!}>
    {children}
  </CourierProvider>
);

const describeE2E = hasCredentials ? describe : describe.skip;

describeE2E("usePreferences (e2e — live API)", () => {
  test("fetchRecipientPreferences returns and populates recipientPreferences", async () => {
    const { result, waitFor } = renderHook(() => usePreferences(), { wrapper });

    let returnValue: any;
    await act(async () => {
      returnValue = await result.current.fetchRecipientPreferences();
    });

    expect(Array.isArray(returnValue)).toBe(true);

    await waitFor(
      () => {
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.recipientPreferences).toBeDefined();
      },
      { timeout: 10000 }
    );

    expect(Array.isArray(result.current.recipientPreferences)).toBe(true);
    expect(result.current.recipientPreferences).toEqual(returnValue);
  });

  test("fetchPreferencePage returns and populates preferencePage", async () => {
    const { result, waitFor } = renderHook(() => usePreferences(), { wrapper });

    let returnValue: any;
    await act(async () => {
      returnValue = await result.current.fetchPreferencePage();
    });

    expect(returnValue).toBeDefined();
    expect(returnValue).toHaveProperty("sections");

    await waitFor(
      () => {
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.preferencePage).toBeDefined();
      },
      { timeout: 10000 }
    );

    expect(result.current.preferencePage).toHaveProperty("sections");
    expect(result.current.preferencePage).toEqual(returnValue);
  });

  if (TOPIC_ID) {
    test("updateRecipientPreferences returns updated value and updates state", async () => {
      const { result, waitFor } = renderHook(() => usePreferences(), {
        wrapper,
      });

      await act(async () => {
        await result.current.fetchRecipientPreferences();
      });

      await waitFor(
        () => {
          expect(result.current.recipientPreferences).toBeDefined();
          expect(result.current.isLoading).toBeFalsy();
        },
        { timeout: 10000 }
      );

      let updated: any;
      await act(async () => {
        updated = await result.current.updateRecipientPreferences({
          templateId: TOPIC_ID,
          status: "OPTED_OUT",
          hasCustomRouting: false,
          routingPreferences: [],
        });
      });

      expect(updated).toBeDefined();
      expect(updated.templateId).toBe(TOPIC_ID);
      expect(updated.status).toBe("OPTED_OUT");

      await waitFor(
        () => {
          expect(result.current.isUpdating).toBeFalsy();
          const pref = result.current.recipientPreferences?.find(
            (p) => p.templateId === TOPIC_ID
          );
          expect(pref).toBeDefined();
          expect(pref!.status).toBe("OPTED_OUT");
        },
        { timeout: 10000 }
      );

      // Clean up: reset back to OPTED_IN
      let reset: any;
      await act(async () => {
        reset = await result.current.updateRecipientPreferences({
          templateId: TOPIC_ID,
          status: "OPTED_IN",
          hasCustomRouting: false,
          routingPreferences: [],
        });
      });

      expect(reset).toBeDefined();
      expect(reset.templateId).toBe(TOPIC_ID);
      expect(reset.status).toBe("OPTED_IN");

      await waitFor(
        () => {
          expect(result.current.isUpdating).toBeFalsy();
        },
        { timeout: 10000 }
      );
    });
  }
});
