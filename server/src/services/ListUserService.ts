import userModel from "../models/user-model";

class ListUserService {
  async getUsers() {
    return userModel.find().exec();
  }
}

export default new ListUserService();
