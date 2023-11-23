import { StoreProvider } from "@/stores/StoreProvider";
import React from "react";
import Login from "./login";

function Index() {
  return (
    <StoreProvider>
      <Login />
    </StoreProvider>
  );
}

export default Index;
