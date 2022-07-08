import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

export const App = () => {
  // function handleCallbackResponse(response) {
  //   console.log("Endcoded JWT ID token", response);
  // }

  React.useEffect(() => {
    // /* global google */
    // google.accounts.id.initialize({
    //   client_id:
    //     "400070145085-i5scdl549f7i8soofv4rbdi1i22l4hr0.apps.googleusercontent.com",
    //   callback: handleCallbackResponse,
    // });
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
