import { Contract, ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import React from "react";

const CreateDraft = () => {
  const [vendor, setVendor] = useState("");
  const [nameOfGoods, setNameOfGoods] = useState("");
  const [nameOfVendor, setNameOfVendor] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const createDraft = async (e) => {
    e.preventDefault();
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const price = ethers.utils.parseUnits(amount.toString(), "ether");
      const tx = await paymentVoucherContract.createDraft(
        vendor,
        nameOfGoods,
        nameOfVendor,
        reason,
        price
      );
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You have successfully created a draft!");
      setVendor("");
      setNameOfGoods("");
      setNameOfVendor("");
      setReason("");
      setAmount("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <button className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded">
          Please Wait...
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-row justify-center items-center font-mono">
      <form
        onSubmit={createDraft}
        className="flex flex-col border rounded-xl shadow-xl w-72 h-fit"
      >
        <h1 className="text-4xl w-full pl-4">Create Draft</h1>
        <div className="border mx-2 mt-2 shadow"></div>
        <label className="mt-4 mb-1 ml-2 uppercase font-bold text-lg text-gray-900">
          Name of Item:
        </label>
        <input
          className="border mx-2 rounded shadow  focus:outline-none focus:ring focus:ring-pink-500"
          value={nameOfGoods}
          placeholder="Enter name of item"
          onChange={(e) => setNameOfGoods(e.target.value)}
        />
        <label className="mt-4 mb-1 ml-2 uppercase font-bold text-lg text-gray-900">
          Name of Vendor:
        </label>
        <input
          className="border mx-2 rounded shadow  focus:outline-none focus:ring focus:ring-pink-500"
          value={nameOfVendor}
          placeholder="Enter name of vendor"
          onChange={(e) => setNameOfVendor(e.target.value)}
        />
        <label className="mt-4 mb-1 ml-2 uppercase font-bold text-lg text-gray-900">
          Address of Vendor(ETH):
        </label>
        <input
          className="border mx-2 rounded shadow focus:outline-none focus:ring focus:ring-pink-500"
          value={vendor}
          placeholder="Enter ETH address of vendor"
          onChange={(e) => setVendor(e.target.value)}
        />
        <label className="mt-4 mb-1 ml-2 uppercase font-bold text-lg text-gray-900">
          Reason for Purchase:
        </label>
        <textarea
          className="border mx-2 rounded shadow  focus:outline-none focus:ring focus:ring-pink-500"
          value={reason}
          placeholder="Reason for purchase"
          onChange={(e) => setReason(e.target.value)}
        />
        <label className="mt-4 mb-1 ml-2 uppercase font-bold text-lg text-gray-900">
          Amount(ETH):
        </label>
        <input
          className="border mx-2 rounded shadow  focus:outline-none focus:ring focus:ring-pink-500"
          value={amount}
          placeholder="Enter amount in ETH"
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="mt-8 w-1/2 py-2 mb-2 bg-pink-500 text-white font-bold rounded"
          >
            Create
          </button>
        </div>
        <div className="mt-4"></div>
      </form>
    </div>
  );
};

export default CreateDraft;
