export interface Session  {
  valid: boolean;
  user_id?: number;
  token?: string;
}

export interface SessionCreateParams {
  phone: string;
  password: string;
}

export const SessionErrors = {
  NO_USER_FOUND: 101
};
