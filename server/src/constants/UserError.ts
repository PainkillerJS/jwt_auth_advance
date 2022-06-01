export enum UserRegistrationError {
  USER_FOUND_ERROR = "Пользователь с таким email зарегистрирован"
}

export enum UserAuthError {
  USER_NO_AUTH_ERROR = "Пользователь не авторизован",
  USER_NO_REG_ERROR = "Пользователь не найден",
  USER_WRONG_PASSWORD_ERROR = "Неверный пароль",
  USER_WRONG_REFRESH_TOKEN = "Токен не валидный"
}
