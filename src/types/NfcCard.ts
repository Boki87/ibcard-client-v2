import { NfcType } from "./NfcType";

export type NfcCard = {
  id: number;
  link: string;
  nfc_type?: NfcType;
  nfc_type_id?: number;
  created_at?: string;
  updated_at?: string;
};
