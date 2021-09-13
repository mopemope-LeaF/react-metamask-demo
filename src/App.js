import React, {useState, useEffect} from 'react';
import { Button,Input, } from '@geist-ui/react'
const { ethereum } = window;

function App() {
    const [account, setaccount] = useState('');

    const accountconnect = async () => {
        if (typeof ethereum == 'undefined') return ;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    }

    const connectWallet = async () => {
        const accoutlist = await accountconnect();
        setaccount(accoutlist)
    }



    const sendeth = async () =>{
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: '0x00', // Only required to send ether to the recipient from the initiating external account.
            data:
                '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        })
    }
  return (
    <ul className="App">
        <li><Button onClick={()=>connectWallet()}>connect wallet</Button> {account}</li>
        <li><Input /></li>
        <li><Input /></li>
        <li><Button onClick={()=>sendeth()}>Send Eth</Button></li>
    </ul>
  );
}

export default App;
