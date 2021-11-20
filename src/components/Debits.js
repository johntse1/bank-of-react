import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debit extends Component{
    constructor(){
        super()

        this.state = {debit:{amount: '',description: '',date: '',},redirect: false
        }
    }
    
    //Adds debit event, e is the event
    addDebits = (e) => {
      this.props.addDebit(this.state.debit)
      this.show();
      this.props.debitInfo.push(this.state.debit)
      e.preventDefault()
    }
    
    show = () =>{
      var displayItem = ''
      for(var i = 0; i < this.props.debitInfo.length;i++)
      {
       displayItem = displayItem + " " + this.props.debitInfo[i].description + ":" + this.props.debitInfo[i].amount + '\n'
      }
      return displayItem = displayItem.split(<br/>)
    }
    //Change events
    changesEvent = (e) => {
      const updatedUser = {...this.state.debit}
      const inputField = e.target.name
      const inputValue = e.target.value

      updatedUser[inputField] = inputValue
      this.setState({debit: updatedUser})
    }

    render () {
        return (
        <div>
            <h2>
            {this.show()}
            </h2>
            <h2></h2>
             <h1>DEBIT</h1>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            <form onSubmit={this.addDebits}>
              <div>
                <label htmlFor="Reason">Reason</label>
                <input type="text" name="description" onChange={this.changesEvent} value={this.state.debit.description}/>
              </div>
              <div>
                <label htmlFor="Amount">Amount</label>
                <input type="number" name="amount" onChange={this.changesEvent} value={this.state.debit.amount} />
              </div>
              <button>Add Debit</button>
            </form>
            <Link to="./">Home</Link>
            <Link to="/userprofile">User Profile</Link>
            <Link to="/credit">Credit</Link>
          </div>                
        )
      }
}

export default Debit;

