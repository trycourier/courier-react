declare module "react-table" {
  interface UseTableProps {
    data: any[];
    columns: any[];
  }

  interface UsePluginProps {
    hooks: any;
  }

  type plugin = (hooks: any) => void;

  export function useTable(UseTableProps, ...plugin);
  export function useSortBy(UsePluginProps);
  export function useFilters(UsePluginProps);
  export function useRowState(UsePluginProps);
}
