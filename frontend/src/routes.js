import React from 'react';

//o BrowserRouter é que precisamos para ficar por volta de todas as rotas
//o Switch vai garantir que apenas uma rota seja executa por momento, mesmo que o caminho seja semelhante nunca chamará mais de uma rota
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident'

// Agora nossas rotas também vão ser um componente
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}