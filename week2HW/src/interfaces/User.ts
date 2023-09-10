export interface User {
  _id: number;
  user_name: string;
  email: string;
  role: string;
  password?: string;
}

export interface UserOutput {
  _id: number;
  user_name: string;
  email: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserTest {
  _id?: number;
  user_name: string;
  email: string;
  role?: string;
  password?: string;
}
