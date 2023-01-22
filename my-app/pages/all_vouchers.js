import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import React from "react";

const all_vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
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

      //call the get all vouchers function
      const data = await paymentVoucherContract.getAllVouchers();
      const items = data.map((i) => {
        let price = ethers.utils.formatUnits(i.toBePaid.toString(), "ether");
        let time = new Date(i.timePaid * 1000).toDateString();
        //let time = timeStamp.toDateString();
        let item = {
          id: i.id.toNumber(),
          draftId: i.draftId.toNumber(),
          price,
          Vendor: i.Vendor,
          nameOfVendor: i.nameOfVendor,
          nameOfGoods: i.nameOfGoods,
          Paid: i.Paid.toString(),
          created: i.created.toString(),
          time,
        };
        return item;
      });
      setVouchers(items);
      setLoadingState("loaded");
      console.log(items);
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingState === "loaded" && !vouchers.length)
    return (
      <div className="min-h-screen flex justify-center items-center font-mono">
        <h1 className="py-10 px-20 text-3xl">No Vouchers Created</h1>
      </div>
    );

  return (
    <div className="min-h-screen font-mono">
      <h1 className="flex justify-center mt-2 text-3xl">All Vouchers</h1>
      <div className="h-fit flex w-full mx-4 p-4 flex-wrap">
        {vouchers.map((voucher, i) => (
          <div
            key={i}
            className="flex flex-col border rounded-xl m-2 p-4 shadow-xl w-fit h-fit"
          >
            <div className="flex">
              <h3 className="font-extrabold">GOOD:</h3>
              <p className="pl-1">{voucher.nameOfGoods}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">NAME OF VENDOR:</h3>
              <p className="pl-1">{voucher.nameOfVendor}</p>
            </div>
            <div>
              <h3 className="font-extrabold">VENDOR ADDRESS(ETH):</h3>
              <p>{voucher.Vendor}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">CREATED:</h3>
              <p className="pl-1">{voucher.created}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">TIME PAID:</h3>
              <p className="pl-1">
                {voucher.Paid === "true" ? voucher.time : "Not Paid"}
              </p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">PAID:</h3>
              <p className="pl-1">{voucher.Paid}</p>
            </div>
            <div className="flex bg-pink-500 justify-center">
              <h3 className="font-extrabold text-white">PRICE(ETH):</h3>
              <p className="pl-1 text-white">{voucher.price} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default all_vouchers;
