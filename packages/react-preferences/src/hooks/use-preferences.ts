import { ICourierContext, useCourier } from "@trycourier/react-provider";
import { useEffect, useState } from "react";
import { OperationResult } from "urql";
import { IPreferenceTemplate } from "~/types";

const RECIPIENT_PREFERENCES = `
  query {
    recipientPreferences {
      nodes {
        templateId
        status
      }
    }
  }
`;

export const usePreferenceTemplates = (): IPreferenceTemplate[] | undefined => {
  const [templates, setPreferenceTemplates] = useState<
    IPreferenceTemplate[] | undefined
  >(undefined);

  const context = useCourier<ICourierContext>();

  const retriveRecipientPreferences = async (): Promise<void> => {
    try {
      const response: OperationResult<{
        recipientPreferences: { nodes: IPreferenceTemplate[] };
      }> = await context?.graphQLClient?.query(RECIPIENT_PREFERENCES);
      console.log("response", response);
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
