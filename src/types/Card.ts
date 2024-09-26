import { NfcCard } from "./NfcCard";
import { Department } from "./Department";
import { Company } from "./Company";
import { SocialLink } from "./SocialLink";

export type Card = {
  show_logo: boolean;
  id: number;
  user_id: number;
  customer_id?: number;
  is_sent?: number;
  sent_at?: string;
  is_setup?: number;
  setup_at?: string;
  role_id?: number;
  admin_roles_id?: number;
  address?: string;
  email?: string;
  email_2?: string;
  company_name?: string;
  company_role?: string;
  company?: Company;
  country?: string;
  image_path?: string;
  logo_path?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  mobile_2?: string;
  nfc_id?: number;
  nfc_card?: NfcCard;
  social_links?: SocialLink[];
  show_shareback?: boolean;
  website?: string;
  website2?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  is_migrated_links?: boolean;
  whatsapp?: string;
  viber?: string;

  // department_id?: number;
  // department?: Department;

  department?: string;

  qr_code_path?: string;
  video_cta?: string;
  video_url?: string;

  //socials
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
  spotify?: string;
  strava?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
  github?: string;

  //special offers
  flyer1?: string;
  flyer2?: string;
  catalogue1?: string;
  catalogue2?: string;
};
