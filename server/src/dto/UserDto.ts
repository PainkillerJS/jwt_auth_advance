import type { IUser } from "../models/user-model";

class UserDto implements Pick<IUser, "email" | "password"> {
  email: string;
  password: string;
}

export default UserDto;
