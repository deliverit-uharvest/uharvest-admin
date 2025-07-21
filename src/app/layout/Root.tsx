// app/layout/Root.tsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

const Root = observer(() => {
  const { userStore } = useStore();

  useEffect(() => {
    console.log("🔄 Root layout mounted");
    userStore.loadUser();
  }, []);

  return <Outlet />;
});

export default Root;
