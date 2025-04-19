export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
