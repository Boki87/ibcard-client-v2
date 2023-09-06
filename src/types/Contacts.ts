export type Contact = {
  id: number;
  created_at: string;
  users_data_id: number;
  user_id: number;
  company_name?: string;
  title?: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  message?: string;
  lat?: number;
  long?: number;
};
