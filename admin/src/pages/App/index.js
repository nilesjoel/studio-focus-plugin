/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import Settings from '../Settings';
import Test from '../Test';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/test`} component={Test} exact />
        <Route path={`/plugins/${pluginId}/settings`} component={Settings} exact />
       
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
