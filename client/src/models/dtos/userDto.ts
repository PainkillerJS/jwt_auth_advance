import type { Token } from "../auth/token";
import type { User } from "../auth/user";

export interface UserGetDto extends Token {
  user: Omit<User, "password">;
}

export interface UserRequestDto extends Pick<User, "email"> {
  password: string;
}
