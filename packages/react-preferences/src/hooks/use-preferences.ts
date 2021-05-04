import { CourierContext, ICourierContext } from "@trycourier/react-provider";
import { useContext, useEffect, useState } from "react";
import { OperationResult } from "urql";

const GET_PREFRENCE_TEMPLATE = `
  query($id: String!) {
    preferenceTemplate(id: $id) {
      templateName
      templateItems {
        itemName
        type
      }
      templateName
    }
  }
`;

const GET_PREFRENCE_TEMPLATES = `
  query {
    preferenceTemplates {
      nodes {
        templateId
      }
    }
  }`;
export interface IPreferenceRule {
  itemName: string;
  itemValue: string | string[];
  type: "snooze" | "channel_preferences" | "status";
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId?: string;
  templateItems: IPreferenceRule[];
}

export const usePreferenceTemplate = (
  templateId: string
): [
  IPreferenceTemplate | undefined,
  (preferenceGrouping: IPreferenceTemplate) => Promise<void>
] => {
  const [preferenceTemplate, setPreferenceTemplate] = useState<
    IPreferenceTemplate | undefined
  >(undefined);

  const context = useContext<ICourierContext | undefined>(CourierContext);

  useEffect(() => {
    context?.graphQLClient
      ?.query(GET_PREFRENCE_TEMPLATE, {
        id: templateId,
      })
      ?.then(
        (
          response: OperationResult<
            { preferenceTemplate: IPreferenceTemplate },
            { id: string }
          >
        ) => {
          const template = response.data
            ?.preferenceTemplate as IPreferenceTemplate;
          setPreferenceTemplate(template);
        }
      );
  }, [templateId]);

  const handleUpdates = async (preferenceGrouping: IPreferenceTemplate) => {
    // Update local state
    setPreferenceTemplate(preferenceGrouping);
    // Perform mutation to persist updates
  };

  return [preferenceTemplate, handleUpdates];
};

export const usePreferenceTemplates = (): string[] | undefined => {
  const [templates, setPreferenceTemplates] = useState<string[] | undefined>(
    undefined
  );

  const context = useContext<ICourierContext | undefined>(CourierContext);

  useEffect(() => {
    context?.graphQLClient?.query(GET_PREFRENCE_TEMPLATES)?.then(
      (
        response: OperationResult<{
          preferenceTemplates: { nodes: IPreferenceTemplate[] };
        }>
      ) => {
        const groupingIds = response.data?.preferenceTemplates.nodes
          ?.map((response) => response?.templateId || "")
          .filter((templateId) => Boolean(templateId));
        setPreferenceTemplates(groupingIds);
      }
    );
  }, []);

  return templates;
};
