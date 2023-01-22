import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import FundModal from "../components/fundModal";
import { Contract, ethers } from "ethers";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";

export default function App({ Component, pageProps }) {
  const [show, setShow] = useState(false);

  const getBalance = async () => {
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

      ///call the get the balance function
      const balance = await paymentVoucherContract.bursaryBalance();
      const bBalance = ethers.utils.formatUnits(balance.toString(), "ether");
      window.alert(`The Bursary balance is ${bBalance} ETH`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Head>
        <title>BlockPay</title>
        <meta name="description" content="Voucher-System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="border-b">
        <p className="text-4xl font-bold flex justify-center items-center">
          Block Pay
        </p>
        <div className="flex justify-center items-center mt-2">
          <Link href="/" className="mr-4 text-pink-500 font-semibold">
            Home
          </Link>
          <Link
            href="/create_draft"
            className="mr-6 text-pink-500 font-semibold"
          >
            Create Draft
          </Link>
          <button
            onClick={() => setShow(true)}
            className="mr-6 text-pink-500 font-semibold"
          >
            Fund Bursary
          </button>
          <Link href="/all_drafts" className="mr-6 text-pink-500 font-semibold">
            All Drafts
          </Link>
          <Link
            href="/all_vouchers"
            className="mr-6 text-pink-500 font-semibold"
          >
            All Vouchers
          </Link>
          <button
            onClick={getBalance}
            className="mr-6 text-pink-500 font-semibold"
          >
            Bursary Balance
          </button>
        </div>
      </nav>
      {show ? (
        <FundModal OnClose={() => setShow(false)} />
      ) : (
        <Component {...pageProps} />
      )}
      <footer className="flex p-4 border-t-2 border-solid border-gray-200 justify-center items-center">
        © 2023~
        <Link
          href="https://github.com/Mayorval?tab=repositories"
          className="hover:text-pink-500"
        >
          Val Chinedu
        </Link>
      </footer>
    </div>
  );
}
