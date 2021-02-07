import { items } from './navigation';

export type FirebaseDocumentData = {
  exists: boolean;
  hasPendingWrites: boolean;
  id: string;
  __snapshot: any;
};

export type NavigationItem = typeof items[0];
