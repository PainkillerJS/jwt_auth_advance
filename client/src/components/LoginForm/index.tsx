import { useState } from "react";
import type { FC, ChangeEvent, Dispatch, SetStateAction, MouseEvent } from "react";

import { observer } from "mobx-react-lite";

import { useStore } from "../../services/contexts/StoreContext";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useStore();

  const onChangeValue = (onChange: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClickBtn = (nameFunc: "login" | "registration") => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    store[nameFunc](email, password);
  };

  return (
    <form>
      <input type="email" value={email} placeholder="Email" onChange={onChangeValue(setEmail)} />
      <input type="password" value={password} placeholder="Password" onChange={onChangeValue(setPassword)} />

      <button onClick={handleClickBtn("login")}>Войти</button>
      <button onClick={handleClickBtn("registration")}>Регистрация</button>
    </form>
  );
};

export default observer(LoginForm);
