const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  //get the contract factory
  const paymentVoucherContract = await ethers.getContractFactory(
    "PaymentVoucher"
  );

  //deploy the contract
  const deployedPaymentVoucherContract = await paymentVoucherContract.deploy();

  await deployedPaymentVoucherContract.deployed();

  //get the address of the payment voucher contract
  console.log(
    "Payment Voucher Contract Address:",
    deployedPaymentVoucherContract.address
  );
}

//call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
