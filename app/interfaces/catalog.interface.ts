export interface ICatalog {
  _id: string;
  key: string;
  labels: Record<string, string>;
  value: number;
  order: number;
  status: number;
}

export interface ILocalizedCatalogOption {
  _id: string;
  key: string;
  value: number;
  label: string;
}
