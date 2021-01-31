export type Document = {
  exists: boolean;
  hasPendingWrites: boolean;
  id: string;
  __snapshot: any;
};
