import { ApiParams, Beer } from "../../types";

export type SortFields = keyof Beer | "type";

// Interface for defining table columns
export interface Column {
  id: keyof Beer;
  label: string;
  sortKey: SortFields;
  filterKey: keyof ApiParams;
}

// Array of columns with corresponding sort and filter keys
export const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    sortKey: "name",
    filterKey: "by_name",
  },
  {
    id: "country",
    label: "Country",
    sortKey: "country",
    filterKey: "by_country",
  },
  {
    id: "brewery_type",
    label: "Type",
    sortKey: "type",
    filterKey: "by_type",
  },
];

// Array of brewery types for the 'Type' filter
export const types = [
  "micro",
  "nano",
  "regional",
  "brewpub",
  "large",
  "planning",
  "bar",
  "contract",
  "proprietor",
  "closed",
];
