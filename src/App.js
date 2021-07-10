import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AppPageHome } from './pages/home'
import { AppPageBookAdd } from './pages/book-add'

function App() {
  return (
    <BrowserRouter>
    hello
      <Switch>
        <Route path={'/'} exact component={AppPageHome}/>
        <Route path={'/book-add'} component={AppPageBookAdd} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
