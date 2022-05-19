import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import ContractListLayout from './ContractListLayout'
const Econtract = require("./contracts/Econtract.json")

export default class RunningContracts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contractList: []
        };
    }

    async componentDidMount() {
        const createContractLayout = (econtract) => {
            return <ContractListLayout
                econtract={econtract}
                history={this.props.history}
            />
        }
        const web3 = new Web3(window.ethereum);
        let networkId = Object.keys(Econtract.networks)[0]
        const econtract = new web3.eth.Contract(Econtract.abi, Econtract.networks[networkId].address);
        var totalAuctions = await econtract.methods.getContractsLength().call();

        new Promise(async function (res, rej) {
            var contractList = []
            for (let i = 0; i < totalAuctions; i++) {
                let auction = await econtract.methods.getContractDetails(i).call();
                auction.id = i;
                contractList.push(createContractLayout(auction))
                console.log(auction)
            }
            res(contractList)
        }).then((auctions) => {
            this.setState({
                contractList: auctions
            })
        })
    }
    render() {
        return (
          <div>
          <Navbar
          history = {this.props.history}/>
          <br/>
          <p>List of running contracts</p>
          {this.state.contractList}
          </div>
        );
      }
}