import { Route, Router } from "@solidjs/router";
import App from "./App";
import AuthenticationPage from "./pages/authentication";
import AuthValidation from "./components/authentication/authValidation";

export default function AppRouter() {
  return (
    <Router>
      <Route component={AuthValidation}>
        <Route path="/" component={App} />
        <Route path="/authentication" component={AuthenticationPage} />
      </Route>
    </Router>
  );
}
