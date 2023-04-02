export interface HeaderTable {
  key: string;
  title: string | number;
  width?: string;
  class?: string;
  sort?: boolean;
}

export interface DataTable<T> {
  group_header: string;
  data: T[];
}

export interface Table<T> {
  headers?: HeaderTable[];
  data: T[] | DataTable<T>[];
}
