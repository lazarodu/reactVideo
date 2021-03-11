import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import {
  Main,
  Login,
  Cadastro,
  Curso,
  CursoStore,
  Aluno,
  AlunoStore,
} from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <PrivateRoute exact path="/" component={Main} />
      <PrivateRoute exact path="/curso/:id" component={CursoStore} />
      <PrivateRoute exact path="/curso" component={Curso} />
      <PrivateRoute exact path="/aluno/:id" component={AlunoStore} />
      <PrivateRoute exact path="/aluno" component={Aluno} />
    </Switch>
  );
};

export default Routes;
