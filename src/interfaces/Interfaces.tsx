
export interface TokenPayload {
  iss: string;
  sub: string;
  userID: string;
  exp: number;
}

export interface Hadith {
  content: string,
  created_in: string,
  row: number,
  said_by: string
}

 export interface userDataInt {
  ROW: number;
  USER_ID: string;
  USER_ROLE: string;
  address: string;
  birthdate: string | null;
  created_at: string;
  email: string;
  full_name: string | null;
  gender: string | null;
  grade: string | null;
  is_active: number;
  last_login: string;
  nationalCode: number;
  parent_phone_number: string | null;
  phone_number: number;
  profile_picture_url: string | null;
  updated_at: string;
  username: string;
}