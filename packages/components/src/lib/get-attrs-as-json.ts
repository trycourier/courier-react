import { camelCase } from "camel-case";

export const getAttrsAsJson = (element?: Element) => {
  if (!element) {
    return;
  }

  return Array.from(element.attributes).reduce(
    (acc, curr) => {
      const attrName = camelCase(curr.name);

      if (!isNaN(Number(curr.value))) {
        acc[attrName] = Number(curr.value);
        return acc;
      }

      if (curr.value.toLowerCase() === "false") {
        acc[attrName] = false;
        return acc;
      }

      if (curr.value.toLowerCase() === "true") {
        acc[attrName] = true;
        return acc;
      }

      try {
        acc[attrName] = JSON.parse(curr.value);
        return acc;
      } catch {
        // do nothing
      }

      acc[attrName] = curr.value;
      return acc;
    },
    {} as {
      [key: string]: any;
    }
  );
};
