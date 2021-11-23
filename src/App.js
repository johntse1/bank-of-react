import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
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
    accountBalance = Math.round(accountBalance*100)/100
    this.setState({debits, credits, accountBalance});
  }
  
  addDebit = (e) => {
    var debit = this.state.accountBalance
    //subtracts the debts out
    //checks validity of amount input
    if(e.amount==0){
      alert("Invalid input for amount")
    }
    debit = this.state.accountBalance - e.amount
    this.setState({accountBalance: debit})
  }

  addCredit = (f) => {
    var credits = this.state.accountBalance
    //adds the credits in
    //Checks validity of amount input
    if(f.amount==0){
      alert("Invalid input for amount")
    }
    //Idk why it wouldn't work when using the +, subtracted by neg 1 to add instead
    credits = this.state.accountBalance - (f.amount*-1)
    this.setState({accountBalance: credits})
  }
  

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>);
    //Binds debit component to show account balance, the adddebit button and the past debits
    const DebitsComponent = () => (<Debit accountBalance={this.state.accountBalance} addDebit={this.addDebit} info={this.state.debits}/> );
    //Binds credit component to show account balance, the addcredit button and the past credits
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} addCredit={this.addCredit} cinfo={this.state.credits}/>);
    
    return (
      <Router>
      <div>
        <Route exact path ="/" render={HomeComponent}/>
        <Route exact path ="/UserProfile" render={UserProfileComponent}/>
        <Route exact path ="/Debits" render={DebitsComponent}/>
        <Route exact path ="/Credits" render={CreditsComponent}/>
      </div>
    </Router>
    );
  }
}

export default App;

