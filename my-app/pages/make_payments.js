import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import React from "react";

const MakePayments = () => {
  const [unPaidVouchers, setUnPaidVouchers] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUnPaidVouchers();
  }, []);

  const loadUnPaidVouchers = async () => {
    try {
      //get the provider
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      //get instance of the contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        provider
      );

      //get all the unPaid Vouchers
      const data = await paymentVoucherContract.getUnPaidVouchers();
      const items = data.map((i) => {
        let price = ethers.utils.formatUnits(i.toBePaid.toString(), "ether");
        let time = new Date(i.timePaid * 1000).toDateString();
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
      setUnPaidVouchers(items);
      setLoadingState("loaded");
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingState === "loaded" && !unPaidVouchers.length) {
    return <h1 className="py-10 px-20 text-3xl">No Unpaid Vouchers</h1>;
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

  const payVoucher = async (unPaidVoucher) => {
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

      const tx = await paymentVoucherContract.payforGoods(unPaidVoucher.id);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You have successfully paid for the goods!");
      loadUnPaidVouchers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen font-mono">
      <h1 className=" flex justify-center mt-2 text-3xl">Unpaid Vouchers</h1>
      <div className="h-fit flex w-full mx-4 p-4 flex-wrap">
        {unPaidVouchers.map((unPaidVoucher, i) => (
          <div
            key={i}
            className="flex flex-col border rounded-xl m-2 p-4 shadow-xl w-fit h-fit"
          >
            <div className="flex">
              <h3 className="font-extrabold">GOOD:</h3>
              <p className="pl-1">{unPaidVoucher.nameOfGoods}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">NAME OF VENDOR:</h3>
              <p className="pl-1">{unPaidVoucher.nameOfVendor}</p>
            </div>
            <div>
              <h3 className="font-extrabold">VENDOR ADDRESS(ETH):</h3>
              <p>{unPaidVoucher.Vendor}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">DATE PAID:</h3>
              <p className="pl-1">
                {unPaidVoucher.Paid === "true" ? unPaidVoucher.time : "null"}
              </p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">CREATED:</h3>
              <p className="pl-1">{unPaidVoucher.created}</p>
            </div>
            <div className="flex">
              <h3 className="font-extrabold">PAID:</h3>
              <p className="pl-1">{unPaidVoucher.Paid}</p>
            </div>
            <div className="w-full bg-black rounded p-2">
              <div className="flex justify-center">
                <h3 className="font-semibold text-white text-base">
                  PRICE(ETH):
                </h3>
                <p className="pl-1 text-white">{unPaidVoucher.price} ETH</p>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  onClick={() => payVoucher(unPaidVoucher)}
                  className="flex justify-center rounded-lg w-1/2 text-white font-extrabold bg-pink-500"
                >
                  PAY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakePayments;
