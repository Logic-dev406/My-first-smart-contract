import React, { Component } from "react";
import Contract from "./contract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { count: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const instance = new web3.eth.Contract(
        Contract,
        "0x2701E7dFc706cF3EC0d7476f36bB5BEC4081D0fe"
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getCount);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  getCount = async () => {
    const { accounts, contract } = this.state;

    //get count
    const response = await contract.methods.count().call();

    //update the state
    this.setState({ count: response });
  };

  incrementCount = async () => {
    const { accounts, contract } = this.state;

    await contract.methods.incrementCount().send({ from: accounts[0] });

    this.getCount()
  };

  decrementCount = async () => {
     const { accounts, contract } = this.state;

    await contract.methods.decrementCount().send({ from: accounts[0] });

    this.getCount()
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div
        style={{ height: "full", width: "full", alignContent: "center" }}
        className="App"
      >
        <h1>Count = {this.state.count} </h1>
        <button
        onClick={this.incrementCount}
          style={{
            height: 40,
            width: 100,
            marginInline: 20,
            textAlign: "center",
          }}
        >
          Increase
        </button>
        <button
        onClick={this.decrementCount}
          style={{
            height: 40,
            width: 100,
            marginInline: 20,
            textAlign: "center",
          }}
        >
          Decrease
        </button>
      </div>
    );
  }
}

export default App;
