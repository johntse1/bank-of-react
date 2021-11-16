import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';

class App extends Component {
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  constructor(){
    super();
    
    this.state = {
      accountBalance: 14568.27, 
      currentUser:{
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      }
    }
  }
  render() {
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent =() =>{
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    };
    return (
      <Router>
      <div>
        <Route exact path ="/" render={HomeComponent}/>
        <Route exact path ="/userProfile" render={UserProfileComponent}/>
        <Route exact path="/login" render={LogInComponent}/>
      </div>
    </Router>
    );
  }
}

export default App;
