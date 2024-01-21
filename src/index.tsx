/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import LogIn from "./pages/logIn";
import { Toaster } from "solid-toast";

const root = document.getElementById("root");

function Index(props: any) {
  return (
    <>
      <Toaster position="bottom-right" />
      {props.children}
    </>
  );
}

render(
  () => (
    <Router root={Index}>
      <Route path="/" component={App} />
      <Route path="/login" component={LogIn} />
    </Router>
  ),
  root!,
);
