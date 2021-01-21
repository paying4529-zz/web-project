import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { List, ListItem} from '@material-ui/core';
import Register from "./pages/register"
import Login from "./pages/login"
import Home from "./pages/home"

function App() {
  return (
    <Router>
        <div className="nav_bar">
          <List component="nav">
            <ListItem ><Link to="/">Home</Link></ListItem>
            <ListItem ><Link to="/register">Register</Link></ListItem>
            <ListItem ><Link to="/login">Login</Link></ListItem>
          </List>
        </div>
        <div class="main_screen">
          <Switch>
            <Route path="/register"><Register /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
