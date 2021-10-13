import React, {useState, useEffect} from 'react';
import { Button,Input, } from '@geist-ui/react'
import { ethers } from 'ethers'
import {OneInchApi} from "1inch-transaction";
const { ethereum } = window;


function App() {
    const [account, setaccount] = useState('');

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const chainId = 1;
    const contractAddress = '0x7643b8c2457c1f36dc6e3b8f8e112fdf6da7698a';

    const accountconnect = async () => {
        if (typeof ethereum == 'undefined') return ;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    };

    const connectWallet = async () => {
        const accoutlist = await accountconnect();
        setaccount(accoutlist)
    };

    // const connect = async () => {
    //     // const provider = new ethers.providers.Web3Provider(ethereum);
    //     // const signer = provider.getSigner();
    //     // const contract = new ethers.Contract(contractAddress, abi, signer);
    //     // // const transaction = await contract.setPixel(110, 120, 0, 0, 0);
    //     // const transaction = await contract["setPixel(uint16, uint16, uint8, uint8, uint8)"](110, 120, 0, 0, 0);
    //     // await transaction.wait();
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //
    // };


    const  swapaction = async () => {
        // let new1 = new OneInchApi();
        // const {chainId} = await provider.getNetwork();
        // const eth_address ="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        //
        // console.log('swapaction=======chainId', chainId);
        // let approveResult;
        // const  amount = 0.1 * Math.pow(10, 18).toString();
        //
        // // new1.approve(chainId, amount, eth_address)
        // //     .then((res) => {
        // //         approveResult = res;
        // //         console.log('=======approve', res);
        // //     });
        // // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // // while (!approveResult) {
        // //     await delay(500);
        // // }
        // const fromToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
        // const toToken = '0xdac17f958d2ee523a2206206994597c13d831ec7';
        // // new1.swap(
        // //         chainId,
        // //         fromToken,
        // //         toToken,
        // //         amount
        // //     )
        // //     .then((res) => {
        // //         console.log('======swap', res);
        // //     });
        const params = {
            from: '0x3CD18131FC5633705D6722B5D1fa88255BAF5d1F',
            to: '0x11111112542d85b3ef69ae05771c2dccff4faa26',
            data: '0x2e95b6c8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000470de4df82000000000000000000000000000000000000000000000000000396e77ca182222f530000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000180000000000000003b74a4607515be43d16f871588adc135d58a9c30a71eb34fcfee7c08',
            value: '0x470DE4DF820000',
        };
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [params],
        });
        console.log(txHash);

    }

    return (
        <ul className="App">
            <li><Button onClick={()=>connectWallet()}>connect wallet</Button> {account}</li>
            {/*<li><Button onClick={()=>connect()}>Connect</Button></li>*/}
            {/*<li><Input /></li>*/}

            <li><Button onClick={()=>swapaction()}>swap</Button></li>
        </ul>
    );
}

export default App;
