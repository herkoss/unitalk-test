export type SortOrder = 'asc' | 'desc';

export interface SortSettings {
  searchValue: string;
  order: SortOrder;
  orderBy: keyof TableData;
}

export interface TableData {
  id: number;
  name: string;
  avatar: string;
  isWorking: boolean;
  createdAt: string;
  text: string;
}
