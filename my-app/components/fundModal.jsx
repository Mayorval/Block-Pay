import React from 'react';
import { Contract, providers, utils, ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";

const FundModal = props => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

  //fundBursary: allows anyone to fund the bursary
  const FundBursary = async () => {
    try {
        //get the provider
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      //create an instance of the payment voucher contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        signer
      );

      //send funds to the contract
      const tx = {
        to: PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        value: utils.parseEther(amount.toString()),
      };
      const tx1 = await signer.sendTransaction(tx);
      setLoading(true);
      await tx1.wait();
      setLoading(false);
      window.alert("You have succeessfully funded the Payment Voucher System");
      setAmount("");
      
      const balance = await paymentVoucherContract.bursaryBalance();
      const bBalance = ethers.utils.formatUnits(balance.toString(), "ether");
      console.log(bBalance);
    } catch (error) {
      console.error(error);
    }
  };


    // if(!props.show){
    //     return null;
    // }

    if (loading) {
        return (
          <div className="min-h-screen flex justify-center items-center">
            <button className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded">
              Please Wait...
            </button>
          </div>
        );
      }

    return(
        <div className ="min-h-screen flex justify-center bg-tranparent items-center" onClick={props.OnClose}>
            <div className="border rounded-xl px-2 shadow-xl w-fit h-fit" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col">
                    <h1 className="font-extrabold flex justify-center mt-2">Fund the Bursary</h1>
                    <div className="border mx-2 shadow"></div>
                </div>
                <div className="flex flex-col">
                   <label className="font-bold mt-4">Amount(ETH):</label>
                   <input
                     className="border rounded shadow  focus:outline-none focus:ring focus:ring-pink-500"
                     value={amount}
                     placeholder="Enter Amount in ETH"
                     onChange={(e) => setAmount(e.target.value)}
                   /> 
                </div>
                <div className="mt-6 flex justify-around">
                    <button className="rounded bg-gray-200 font-semibold mx-2 mb-2 w-1/2" onClick={props.OnClose}>CLOSE</button>
                    <button className="bg-pink-400 rounded text-white font-semibold mx-2 mb-2 w-1/2"onClick={FundBursary}>FUND</button>
                </div>
            </div>
        </div>
    );
}

export default FundModal;