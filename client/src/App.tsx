import { useEffect } from "react";
import type { FC } from "react";

import { observer } from "mobx-react-lite";

import LoginForm from "./components/LoginForm";
import { useStore } from "./services/contexts/StoreContext";
import { getTokenStorage } from "./packages/storage";

const App: FC = () => {
  const { store } = useStore();

  useEffect(() => {
    if (getTokenStorage()) {
      console.log(1);
      store.checkAuth();
    }
  }, []);

  return (
    <div>
      <h1>{store.isAuth ? store.user.email : "Авторизуйтесь"}</h1>
      <LoginForm />
    </div>
  );
};

export default observer(App);
