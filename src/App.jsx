import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header'
import Home from './views/Home'
import Source from './views/Source'
import Search from './views/Search'
import './styles/global.scss'

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/source/:source" component={Source} />
        <Route path="/search/:title" component={Search} />
        <Route component={Home} />
      </Switch>
    </Router>
  </div>
)

export default App;
