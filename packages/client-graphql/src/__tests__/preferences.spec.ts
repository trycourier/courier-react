import Preferences from "../preferences";

const CLIENT_KEY = process.env.CLIENT_KEY;
const USER_ID = process.env.USER_ID;
const JWT = process.env.JWT;
const TOPIC_ID = process.env.TOPIC_ID;
const TENANT_ID = process.env.TENANT_ID;
const DIGEST_SCHEDULE_ID = process.env.DIGEST_SCHEDULE_ID;
const API_URL = process.env.API_URL;
const hasCredentials = !!(CLIENT_KEY && USER_ID);

const describeE2E = hasCredentials ? describe : describe.skip;

describeE2E("preferences (e2e — live API)", () => {
  let api: ReturnType<typeof Preferences>;

  beforeAll(() => {
    api = Preferences({
      clientKey: CLIENT_KEY,
      userId: USER_ID,
      authorization: JWT,
      apiUrl: API_URL ? `${API_URL}/client/q` : undefined,
    });
  });

  test("getRecipientPreferences returns an array", async () => {
    const result = await api.getRecipientPreferences(TENANT_ID);
    expect(Array.isArray(result)).toBe(true);
  });

  test("getPreferencePage returns page data", async () => {
    const result = await api.getPreferencePage(TENANT_ID);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("sections");
  });

  test("getDraftPreferencePage returns page data or undefined", async () => {
    const result = await api.getDraftPreferencePage();
    if (result) {
      expect(result).toHaveProperty("sections");
    }
  });

  if (TOPIC_ID) {
    test("updateRecipientPreferences round-trips a status change", async () => {
      const updated = await api.updateRecipientPreferences({
        templateId: TOPIC_ID,
        status: "OPTED_OUT",
        hasCustomRouting: false,
        routingPreferences: [],
        tenantId: TENANT_ID,
      });

      expect(updated).toBeDefined();
      expect(updated.templateId).toBe(TOPIC_ID);

      const reset = await api.updateRecipientPreferences({
        templateId: TOPIC_ID,
        status: "OPTED_IN",
        hasCustomRouting: false,
        routingPreferences: [],
        tenantId: TENANT_ID,
      });

      expect(reset).toBeDefined();
      expect(reset.templateId).toBe(TOPIC_ID);
    });

    test("updateRecipientPreferences with custom routing", async () => {
      const updated = await api.updateRecipientPreferences({
        templateId: TOPIC_ID,
        status: "OPTED_IN",
        hasCustomRouting: true,
        routingPreferences: ["email", "push"],
        tenantId: TENANT_ID,
      });

      expect(updated).toBeDefined();
      expect(updated.hasCustomRouting).toBe(true);
      expect(updated.routingPreferences).toEqual(
        expect.arrayContaining(["email", "push"])
      );

      await api.updateRecipientPreferences({
        templateId: TOPIC_ID,
        status: "OPTED_IN",
        hasCustomRouting: false,
        routingPreferences: [],
        tenantId: TENANT_ID,
      });
    });

    if (DIGEST_SCHEDULE_ID) {
      test("updateRecipientPreferences with digestSchedule", async () => {
        const updated = await api.updateRecipientPreferences({
          templateId: TOPIC_ID,
          status: "OPTED_IN",
          hasCustomRouting: false,
          routingPreferences: [],
          digestSchedule: DIGEST_SCHEDULE_ID,
          tenantId: TENANT_ID,
        });

        expect(updated).toBeDefined();
        expect(updated.templateId).toBe(TOPIC_ID);
        expect(updated.digestSchedule).toBe(DIGEST_SCHEDULE_ID);
      });
    }
  }
});
