import { ICourierContext, useCourier } from "@trycourier/react-provider";
import { useEffect, useState } from "react";
import { OperationResult } from "urql";

const RECIPIENT_PREFRENCES = `
  query {
    recipientPreferences {
      nodes {
        templateId
        templateName
        templateItems {
          itemName
          type
        }
        value {
          status
          snooze {
            start
          }
          channel_preferences
        }
      }
    }
  }
`;

export interface IPreferenceRule {
  itemName: string;
  itemValue: string | string[];
  type: "snooze" | "channel_preferences" | "status";
}

export type ChannelClassification = "direct_message" | "email" | "push";

export type PreferenceStatus = "OPTED_OUT" | "OPTED_IN" | undefined;

export type SnoozePreference = {
  start?: string;
  until: string;
};

export interface IPreference {
  status: PreferenceStatus;
  snooze: SnoozePreference;
  channel_preferences?: Array<ChannelClassification>;
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId: string;
  templateItems: IPreferenceRule[];
  value: IPreference;
}

export const usePreferenceTemplates = (): IPreferenceTemplate[] | undefined => {
  const [templates, setPreferenceTemplates] = useState<
    IPreferenceTemplate[] | undefined
  >(undefined);

  const context = useCourier<ICourierContext>();

  const retriveRecipientPreferences = async (): Promise<void> => {
    try {
      const response: OperationResult<{
        recipientPreferences: { nodes: IPreferenceTemplate[] };
      }> = await context?.graphQLClient?.query(RECIPIENT_PREFRENCES);
      return setPreferenceTemplates(response.data?.recipientPreferences.nodes);
    } catch (error) {
      console.error(
        "Couldn't find any preferences associated with this user. Check if recipient profile extsts in Courier"
      );
      return;
    }
  };

  useEffect(() => {
    retriveRecipientPreferences();
  }, []);

  return templates;
};
