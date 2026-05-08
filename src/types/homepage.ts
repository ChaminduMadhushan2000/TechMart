export interface HomepageSection {
  id: string;
  storeId: string;
  type: string;
  label: string;
  isActive: boolean;
  sortOrder: number;
  config: Record<string, unknown>;
  createdAt: string;
}