import { Contract, providers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, PAYMENT_VOUCHER_CONTRACT_ADDRESS } from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  //walletconnected keeps track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  //loading is set to true when we are waiting for the transaction to get mined
  const [loading, setLoading] = useState(false);
  //checks if the currently connected metaMask wallet is the VC(Vice-Chancellor)
  const [isVC, setIsVC] = useState(false);
  //checks if the connected metaMask Wallet is the Bursar
  const [isBursar, setIsBursar] = useState(false);
  //checks if the connected metaMask wallet is the Expenditure Control Unit
  const [isECU, setIsECU] = useState(false);
  //create a reference to the Web3 Modal (used for connecting to MetaMask) which persists as long as the page is open
  const web3ModalRef = useRef();

  //getVC: calls the contract to retrieve the VC
  const getVC = async () => {
    try {
      const provider = await getProviderOrSigner();

      //get an instance of the Payment Voucher Contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        provider
      );

      const VC = await paymentVoucherContract.VC();
      const signer = await getProviderOrSigner(true);
      const userAddress = await signer.getAddress();

      if (VC.toLowerCase() === userAddress.toLowerCase()) {
        setIsVC(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //getBursar: calls the contract to retrieve the Bursar
  const getBursar = async () => {
    try {
      const provider = await getProviderOrSigner();

      //get an instance of the Payment Voucher Contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        provider
      );

      const Bursar = await paymentVoucherContract.Bursar();
      const signer = await getProviderOrSigner(true);
      const userAddress = await signer.getAddress();

      if (Bursar.toLowerCase() === userAddress.toLowerCase()) {
        setIsBursar(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //getECU: calls the contract to retrieve the ECU
  const getECU = async () => {
    try {
      //Get the provider from web3Modal, which in our case is MetaMask
      //No need for the signer here, as we are reading state from the  blockchain
      const provider = await getProviderOrSigner();

      //get an instance of the Payment Voucher Contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        provider
      );

      const ECU = await paymentVoucherContract.ECU();
      //we will get the signer now to extract the address of the currently connected Metamask account
      const signer = await getProviderOrSigner(true);
      const userAddress = await signer.getAddress();

      if (ECU.toLowerCase() === userAddress.toLowerCase()) {
        setIsECU(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    //connect to MetaMask
    //since we store 'web3Modal' as a reference, we need to access the 'current' value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    //if user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Incorrect Password");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  //withdrawFund: allows only the VC to withdraw the funds from the contract
  const withdrawFunds = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      //get an instance of the payment voucher contract
      const paymentVoucherContract = new Contract(
        PAYMENT_VOUCHER_CONTRACT_ADDRESS,
        abi,
        signer
      );

      //call the withdraw function
      const tx = await paymentVoucherContract.withdraw();
      setLoading(true);
      //wait for transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You have succeessfully Withdrawn Funds");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * connectWallet: connects the MetaMask wallet
   */
  const connectWallet = async () => {
    try {
      //Get the provider from web3Modal, which in our case is MetaMask
      //When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      await getVC();
      await getBursar();
      await getECU();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      //Assign the Web3Modal class to the reference object by setting its 'current' value
      // The 'current' value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      //connectWallet();
    }
  }, [walletConnected]);

  //renderButton: Returns a button based on the state of the dapp

  const renderButton = () => {
    //if wallet is not connected, return a button which allows them to connect their wallet
    if (!walletConnected) {
      return (
        <div>
          <h1 className={styles.title}>Welcome to BlockPay</h1>
          <div className={styles.description}>
            A Decentralized Payment Voucher Management System
          </div>
          <button
            onClick={connectWallet}
            className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        </div>
      );
    }

    // If we are currently waiting for something, return a loading button
    if (loading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <button className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded">
            Please Wait...
          </button>
        </div>
      );
    }

    //if wallet is connected, and not VC, Bursar, TD, or ECU, render button to create draft, get created drafts and fund bursary
    if (walletConnected && !isVC && !isBursar && !isECU) {
      return (
        <div>
          <h1 className="text-3xl my-8">Hi there, Solicitor!</h1>
          <div className="leading-none my-8 mx-0 text-xl">Welcome back!</div>
          <div className="flex p-2 justify-center w-full"></div>
        </div>
      );
    }

    //if wallet is connected and user is VC, render Approve Draft, Withdraw funds, Get All Vouchers, fund bursary
    if (isVC) {
      return (
        <div>
          <h1 className="text-4xl my-8 mx-0">Hi there, Vice-Chancellor!</h1>
          <div className="leading-none my-8 mx-0 text-xl">Welcome back!</div>
          <div className="flex">
            <button
              onClick={(e) => {
                e.preventDefault;
                window.location.href = "/approve_draft";
              }}
              className="mx-1 w-1/3 bg-pink-500 text-white text-lg font-bold py-0 px-0 rounded"
            >
              Approve Drafts
            </button>
            <button
              onClick={(e) => {
                e.preventDefault;
                window.location.href = "/appoint_staff";
              }}
              className="mx-1 w-1/3 bg-pink-500 text-white text-lg font-bold py-0 px-0 rounded"
            >
              Appoint Staff
            </button>
            <button
              onClick={withdrawFunds}
              className="mx-1 w-1/3 bg-pink-500 text-white text-lg font-bold py-0 px-0 rounded"
            >
              Withdraw Funds
            </button>
          </div>
        </div>
      );
    }

    //if wallet is connected and the user is the Bursar, then render make payments, get all vouchers, fund bursary
    if (isBursar) {
      return (
        <div>
          <h1 className="text-3xl my-8">Hi there, Bursar!</h1>
          <div className="leading-none my-8 mx-0 text-xl">Welcome back!</div>
          <div className="flex p-2 justify-center w-full">
            <button
              onClick={(e) => {
                e.preventDefault;
                window.location.href = "/make_payments";
              }}
              className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-8 rounded-lg"
            >
              Make Payments
            </button>
          </div>
        </div>
      );
    }

    //if wallet is coneected and user is ECU, render create vouchers and fund bursary
    if (isECU) {
      return (
        <div>
          <h1 className="text-3xl my-8 mx-0">
            Hi there, Head Expenditure Control Unit!
          </h1>
          <div className="leading-none my-8 mx-0 text-xl">Welcome back!</div>
          <div className="flex p-2 justify-center w-full">
            <button
              onClick={(e) => {
                e.preventDefault;
                window.location.href = "/create_voucher";
              }}
              className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Create Voucher
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <button className="mt-4 w-2/5 bg-pink-500 text-white font-bold py-2 px-4 rounded">
            Please Wait...
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center font-mono">
          {renderButton()}
          <div>
            <img className="w-3/5 h-2/4 ml-32" src="./0.svg" />
          </div>
        </div>
      )}
    </div>
  );
}
