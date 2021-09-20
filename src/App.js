import React, {useState, useEffect} from 'react';
import { Button,Input, } from '@geist-ui/react'
import { ethers } from 'ethers'
const { ethereum } = window;

const abi = [
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "width_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "height_",
                "type": "uint16"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "invitee",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "inviter",
                "type": "address"
            }
        ],
        "name": "DoInvition",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "xAxis",
                "type": "uint16"
            },
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "yAxis",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "r",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "g",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "b",
                "type": "uint8"
            }
        ],
        "name": "DoPixel",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "end",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "xAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "yAxis_",
                "type": "uint16"
            }
        ],
        "name": "getPixel",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "getShares",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "height",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "xAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "yAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint8",
                "name": "r_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "g_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "b_",
                "type": "uint8"
            }
        ],
        "name": "setPixel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "xAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "yAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint8",
                "name": "r_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "g_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "b_",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "inviter",
                "type": "address"
            }
        ],
        "name": "setPixel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "start",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "width",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


function App() {
    const [account, setaccount] = useState('');

    const contractAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const accountconnect = async () => {
        if (typeof ethereum == 'undefined') return ;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    };

    const connectWallet = async () => {
        const accoutlist = await accountconnect();
        setaccount(accoutlist)
    };

    const startProject = async () => {
        const transaction = await contract.start();
        let a = await transaction.wait();
        console.log(a);
    };

    const place = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        // const transaction = await contract.setPixel(110, 120, 0, 0, 0);
        const transaction = await contract["setPixel(uint16,uint16,uint8,uint8,uint8)"](110, 120, 1, 0, 0);
        await transaction.wait();
    };


    // const sendeth = async () =>{
    //     const transactionParameters = {
    //         nonce: '0x00', // ignored by MetaMask
    //         gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    //         gas: '0x2710', // customizable by user during MetaMask confirmation.
    //         to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
    //         from: ethereum.selectedAddress, // must match user's active address.
    //         value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    //         data:
    //             '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    //         chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    //     };
    //
    //     const txHash = await ethereum.request({
    //         method: 'eth_sendTransaction',
    //         params: [transactionParameters],
    //     })
    // };
  return (
    <ul className="App">
        <li><Button onClick={()=>connectWallet()}>connect wallet</Button> {account}</li>
        <li><Button onClick={()=>startProject()}>Start</Button></li>
        <li><Button onClick={()=>place()}>Place</Button></li>
        <li><Input /></li>
    </ul>
  );
}

export default App;
