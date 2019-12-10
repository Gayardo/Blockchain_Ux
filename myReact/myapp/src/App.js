import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TOKEN_ABI, TOKEN_ADDRESS } from './config'
class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    const lastBlock= await web3.eth.getBlockNumber()
    
    this.setState({ account: accounts[0] })
    this.setState({ BlockNumber: lastBlock})
    const myToken = new web3.eth.Contract(TOKEN_ABI,TOKEN_ADDRESS)
    
    this.setState({ myToken })
    const name = await myToken.methods.name().call()
    this.setState({ name })
    const counter = await myToken.methods._currentId().call()
    this.setState({ counter })
  }
  constructor(props) {
    super(props)
    this.state = { account: '',BlockNumber: 0 }
  }
  render() {
    return (
      <div>
        <p>chainId: {this.state.account}</p>
        <p>Last block number:{this.state.BlockNumber} </p>
        <p> Registry Name: {this.state.name} </p>
        <p> Counter :  {this.state.counter} </p>
      </div>
    );
  }
}

export default App;