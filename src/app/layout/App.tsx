import React, { useEffect } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TopNavBar from "./TopNavBar";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { userStore } = useStore();

  useEffect(() => {
    userStore.loadUser();
  }, []);

  return (
    <>
      <TopNavBar />
    </>
  );
}

export default observer(App);
