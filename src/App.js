import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './Login';
import axios from "axios";
import Debit from './components/Debits';
import Credits from './components/Credits';

class App extends Component {
  
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  //Keeps the value of stored so that other files can access
  constructor(){
    super();
    
    this.state = {
      accountBalance: 14568.27, 
      currentUser:{
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: []
    }
  }

  //Given to compute the credits and debits
  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
   
    //get data from API response
    debits = debits.data
    credits = credits.data

    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })

    let accountBalance = creditSum - debitSum;
    this.setState({debits, credits, accountBalance});
  }
  
  addDebit = (e) => {
    //send to debits view via props
    //updates state based off user input
    var debt = this.state.accountBalance
    debt = this.state.accountBalance - e.amount
    this.setState({accountBalance: debt})
  }
  

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
    );
    const DebitsComponent = () => (<Debit accountBalance={this.state.accountBalance} addDebit={this.addDebit} debitInfo={this.state.debits}/> );
    
    return (
      <Router>
      <div>
        <Route exact path ="/" render={HomeComponent}/>
        <Route exact path ="/UserProfile" render={UserProfileComponent}/>
        <Route exact path ="/Debits" render={DebitsComponent}/>
      </div>
    </Router>
    );
  }
}

export default App;

