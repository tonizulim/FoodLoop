import { NewItem } from "./NewItemDTO";

export interface ItemFormState {
  error: string;
  success: boolean;
  loading: boolean;
  fieldErrors: Record<string, string>;
}
