import Web3 from "web3";
import { abi } from "../abi/erc20Contract.json";
import { abi as uniSwapAbi } from "../abi/uniSwapContract.json";
let web3;
let stakingContract;
let databaseContract;
let erc20Contract;
export const initializeWeb3 = async (tokenAddress, provider, account) => {
  console.log("xxxxxxxxxxxx changed xxxxxxxxxxx", provider, account);

  web3 = new Web3(provider);

  erc20Contract = new web3.eth.Contract(abi, tokenAddress);
  let allownce = await erc20Contract.methods
    .allowance(account, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
    .call(); // contract.methods.methodName(parameters).send({from:selected account})
  if (!allownce) {
    await erc20Contract.methods
      .approve(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        web3.utils.toWei("10000000000000")
      )
      .send({ from: account /*** selected account from metamask ***/ }) //
      .on("transactionHash", (hash) => {
        // hash of tx
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 1) {
          alert("Approval Success");
        }
      });
  }
  // export const checkApproval = async (sourceAddress) => {
  //   console.log("account 0", stakingContract);

  // };
};

export const checkApproval = async (sourceAddress) => {
  console.log("account 0", stakingContract);
  return await erc20Contract.methods
    .allowance(sourceAddress, stakingContract._address)
    .call(); // contract.methods.methodName(parameters).send({from:selected account})
};
