import { Contract, providers, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import React from "react";

const AllDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      //get instance of the contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        provider
      );

      //call the get all drafts function
      const data = await paymentVoucherContract.getAllDrafts();
      const items = data.map((i) => {
        let price = ethers.utils.formatUnits(
          i.AmountToBePaid.toString(),
          "ether"
        );
        let item = {
          DraftId: i.DraftId.toNumber(),
          nameOfGoods: i.nameOfGoods,
          nameOfVendor: i.nameOfVendor,
          Vendor: i.Vendor,
          reason: i.reason,
          price,
          approved: i.approved.toString(),
          created: i.created.toString(),
        };
        return item;
      });
      setDrafts(items);
      setLoadingState("loaded");
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingState === "loaded" && !drafts.length)
    return (
      <div className="min-h-screen flex justify-center items-center font-mono">
        <h1 className="py-10 px-20 text-3xl">No Drafts Created</h1>
      </div>
    );

  return (
    <div className="min-h-screen font-mono">
      <h1 className=" flex justify-center mt-2 text-3xl">All Drafts</h1>
      <div className="h-fit flex w-full mx-4 p-4 flex-wrap">
        {drafts.map((draft, i) => (
          <div
            key={i}
            className="flex flex-col border rounded-xl m-2 p-4 shadow-xl w-fit h-fit"
          >
            <div className="flex">
              <h3 className="font-extrabold">GOOD:</h3>
              <p className="pl-1">{draft.nameOfGoods}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">NAME OF VENDOR:</h3>
              <p className="pl-1">{draft.nameOfVendor}</p>
            </div>
            <div>
              <h3 className="font-extrabold">VENDOR ADDRESS(ETH):</h3>
              <p>{draft.Vendor}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">REASON:</h3>
              <p className="pl-1">{draft.reason}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">CREATED:</h3>
              <p className="pl-1">{draft.created}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">APPROVED:</h3>
              <p className="pl-1">{draft.approved}</p>
            </div>
            <div className="flex bg-pink-500 justify-center">
              <h3 className="font-extrabold text-white">PRICE(ETH):</h3>
              <p className="pl-1 text-white">{draft.price} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDrafts;
