import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/landing/Landing';
import OrphanagesMap from './pages/orphanage-map/OrphanagesMap';
import Orphanage from './pages/orphanage/Orphanage';
import CreateOrphanage from './pages/create-orphanage/CreateOrphanage';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanagesMap}/>
                <Route path="/orphanage/create" component={CreateOrphanage}/>
                <Route path="/orphanage/:id" component={Orphanage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes
