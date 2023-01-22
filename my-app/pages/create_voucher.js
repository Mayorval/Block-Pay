import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import React from "react";

const CreateVoucher = () => {
  const [approvedDrafts, setApprovedDrafts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApprovedDrafts();
  }, []);

  const loadApprovedDrafts = async () => {
    try {
      //get the provider
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      //get an instance of the contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        provider
      );

      //call the approved drafts function
      const data = await paymentVoucherContract.getApprovedDrafts();
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
      setApprovedDrafts(items);
      setLoadingState("loaded");
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingState === "loaded" && !approvedDrafts.length) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="py-10 px-20 text-3xl">No Approved Drafts</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <button className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded">
          Please Wait...
        </button>
      </div>
    );
  }

  const create_Voucher = async (approvedDraft) => {
    try {
      //get the signer
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      //get instance of the contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        signer
      );

      //create a voucher
      const tx = await paymentVoucherContract.createVoucher(
        approvedDraft.DraftId
      );
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You have successfully created a Voucher!");
      loadApprovedDrafts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen font-mono">
      <h1 className=" flex justify-center mt-2 text-3xl">Approved Drafts</h1>
      <div className="h-fit flex w-full mx-4 p-4 flex-wrap">
        {approvedDrafts.map((approvedDraft, i) => (
          <div
            key={i}
            className="flex flex-col border rounded-xl m-2 p-4 shadow-xl w-fit h-fit"
          >
            <div className="flex">
              <h3 className="font-extrabold">GOOD:</h3>
              <p className="pl-1">{approvedDraft.nameOfGoods}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">NAME OF VENDOR:</h3>
              <p className="pl-1">{approvedDraft.nameOfVendor}</p>
            </div>
            <div>
              <h3 className="font-extrabold">VENDOR ADDRESS(ETH):</h3>
              <p>{approvedDraft.Vendor}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">REASON:</h3>
              <p className="pl-1">{approvedDraft.reason}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">CREATED:</h3>
              <p className="pl-1">{approvedDraft.created}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">APPROVED:</h3>
              <p className="pl-1">{approvedDraft.approved}</p>
            </div>
            <div className="w-full bg-black rounded p-2">
              <div className="flex justify-center">
                <h3 className="font-semibold text-white text-base">
                  PRICE(ETH):
                </h3>
                <p className="pl-1 text-white">{approvedDraft.price} ETH</p>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  onClick={() => create_Voucher(approvedDraft)}
                  className="flex justify-center rounded-lg w-1/2 text-white font-extrabold bg-pink-500"
                >
                  CREATE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateVoucher;
