import { Contract, ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import React from "react";

const AppointStaff = () => {
  const [bursar, setBursar] = useState("");
  const [ECU, setECU] = useState("");
  const [loading, setLoading] = useState(false);

  const appoint = async (e) => {
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

      const tx = await paymentVoucherContract.appointStaff(bursar, ECU);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You have successfully appointed new staff");
      setBursar("");
      setECU("");
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <button className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded">
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-row justify-center items-center font-mono">
      <form
        onSubmit={appoint}
        // className="flex flex-col border-solid border-4 rounded-lg h-96 w-72"
        className=" flex flex-col border shadow-xl rounded-xl overflow-hidden h-96 w-72"
      >
        <h1 className="text-4xl w-full pl-4">Appoint Staff</h1>
        <div className="border mx-2 mt-2 shadow"></div>
        <label className="mt-8 mb-1 ml-2 uppercase font-bold text-lg text-gray-900">
          Bursar:
        </label>
        <input
          value={bursar}
          name="bursar"
          placeholder="Enter Bursar Address"
          onChange={(e) => setBursar(e.target.value)}
          className="border mx-2 rounded shadow focus:outline-none focus:ring focus:ring-pink-500"
        />
        <label className="mt-8 mb-1 ml-2 px-0 uppercase font-bold text-lg text-gray-900">
          Expenditure Control Unit:
        </label>
        <input
          value={ECU}
          name="ECU"
          placeholder="Enter ECU Address"
          onChange={(e) => setECU(e.target.value)}
          className="border mx-2 rounded shadow  focus:outline-none focus:ring focus:ring-pink-500"
        />
        <div className="flex mt-2 h-full justify-center items-center">
          <button
            type="submit"
            className="mt-2 w-1/2 bg-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            Appoint
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointStaff;
