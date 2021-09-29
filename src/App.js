import React, {useState, useEffect} from 'react';
import { Button,Input, } from '@geist-ui/react'
import { ethers } from 'ethers'
import {LimitOrderBuilder, MetamaskProviderConnector, OneInchLimitApi} from "1inch-transaction";
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

    const connect = async () => {
        // const provider = new ethers.providers.Web3Provider(ethereum);
        // const signer = provider.getSigner();
        // const contract = new ethers.Contract(contractAddress, abi, signer);
        // // const transaction = await contract.setPixel(110, 120, 0, 0, 0);
        // const transaction = await contract["setPixel(uint16, uint16, uint8, uint8, uint8)"](110, 120, 0, 0, 0);
        // await transaction.wait();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const connector = new MetamaskProviderConnector(provider);
        // console.log(connector);
        // const limitOrderBuilder = new LimitOrderBuilder(
        //     contractAddress,
        //     chainId,
        //     connector
        // );
        // const limitOrder = {
        //     salt: '1',
        //     makerAsset: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        //     takerAsset: '0x111111111117dc0aa78b770fa6a738034120c302',
        //     makerAssetData: '0x23b872dd000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064',
        //     takerAssetData: '0x23b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000c8',
        //     getMakerAmount: '0xf4a215c3000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8',
        //     getTakerAmount: '0x296637bf000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8',
        //     predicate: '0x0',
        //     permit: '0x0',
        //     interaction: '0x0',
        // };
        // const limitOrderTypedData = limitOrderBuilder.buildLimitOrderTypedData(
        //     limitOrder
        // );
        // const limitOrderSignature = limitOrderBuilder.buildOrderSignature(
        //     ethereum.selectedAddress,
        //     limitOrderTypedData
        // );
        // const limitOrderHash = limitOrderBuilder.buildLimitOrderHash(
        //     limitOrderTypedData
        // );

        // console.log("==== type data ====");
        // console.log(limitOrderTypedData);
        //
        // console.log("==== order signature ===");
        // console.log(limitOrderSignature);
        //
        // console.log("==== order hash ===");
        // console.log(limitOrderHash);

        const limit_api = new OneInchLimitApi();

        const [limitOrder, orderHash, orderSignature] = await limit_api.sign(56, "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "0x111111111117dc0aa78b770fa6a738034120c302", "100000", "10000", 1000);
        const response = await limit_api.send(56, limitOrder, orderHash, orderSignature);
        console.log(response);
    };


  return (
    <ul className="App">
        <li><Button onClick={()=>connectWallet()}>connect wallet</Button> {account}</li>
        <li><Button onClick={()=>connect()}>Connect</Button></li>
        <li><Input /></li>
    </ul>
  );
}

export default App;
