import { SocialType } from "./SocialTypes";

export type SocialLink = {
  id: number;
  users_data_id: number;
  type: SocialType;
  title?: string;
  url?: string;
  cta?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};
