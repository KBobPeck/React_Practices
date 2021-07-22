import React from "react";
import { Navbar, Sidebar, Footer } from "./Layout";

import {
  HomePage as Home,
  SingleProductPage as Single,
  CartPage as Cart,
  ErrorPage as Error,
  AboutPage as About,
  // AuthWrapper as Auth,
  CheckoutPage as Checkout,
  PrivateRoute as Private,
  ProductsPage as Products,
} from "./Pages";

import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Link,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Home />
      <Switch>
        <Route exact path="/"></Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>

        <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/products/:id" children={<Single />} />

        <Route exact path="/checkout">
          <Checkout />
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
