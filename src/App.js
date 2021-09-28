import React, {useState, useEffect} from 'react';
import { Button,Input, } from '@geist-ui/react'
import { ethers } from 'ethers'
import { LimitOrderBuilder,  } from '1inch-transaction'
const { ethereum } = window;


function App() {
    const [account, setaccount] = useState('');

    // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, abi, signer);

    const accountconnect = async () => {
        if (typeof ethereum == 'undefined') return ;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    };

    const connectWallet = async () => {
        const accoutlist = await accountconnect();
        setaccount(accoutlist)
    };

    const place = async () => {
        console.log(LimitOrderBuilder);
    };


  return (
    <ul className="App">
        <li><Button onClick={()=>connectWallet()}>connect wallet</Button> {account}</li>
        <li><Button onClick={()=>place()}>Place</Button></li>
        <li><Input /></li>
    </ul>
  );
}

export default App;
