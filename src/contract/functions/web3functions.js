import Web3 from "web3";
import { abi } from "../abi/erc20Contract.json";
import { abi as uniSwapAbi } from "../abi/uniSwapContract.json";
import { abi as poolAbi } from "../abi/poolContract.json";
let web3;
let uniSwapContract;
let poolContract;
let erc20Contract;

export const initializeWeb3 = async (
  tokenAddress,
  provider,
  account,
  setTokenBalance,
  setEthBalance
) => {
  console.log("xxxxxxxxxxxx changed xxxxxxxxxxx", provider, account);

  web3 = new Web3(provider);

  erc20Contract = new web3.eth.Contract(
    abi,
    "0xd77c48adc8730e240bee8f26268684121d7d2470"
  );
  poolContract = new web3.eth.Contract(
    poolAbi,
    "0xfb81db17c754c36fbe542059752f7081dbe7f99a"
  );
  uniSwapContract = new web3.eth.Contract(
    uniSwapAbi,
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  );
  let tokenBalance = await getBalanceMav(
    "0x3E5c715e8a0836B1637F9971A69376fe4d699A35"
  );
  setTokenBalance(await fromWei(tokenBalance));
  let ethBalance = await getEthBalance(account);
  setEthBalance(await fromWei(ethBalance));
  let allownce = await erc20Contract.methods
    .allowance(account, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
    .call(); 
    console.log(allownce)
  if (!Number(allownce)) {
    console.log('hee')
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
  console.log("account 0");
  return await erc20Contract.methods
    .allowance(sourceAddress, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
    .call(); // contract.methods.methodName(parameters).send({from:selected account})
};
export const getBalanceMav = async (tokenAddress) => {
  console.log(erc20Contract);
  if (erc20Contract?.methods) {
    return await erc20Contract.methods.balanceOf(tokenAddress).call();
  } else {
    return;
  }
};
export const getEthBalance = async (address) => {
  return await web3.eth.getBalance(address);
};
export const fromWei = async (amount) => {
  return await web3.utils.fromWei(amount);
};
export const toWei = async (amount) => {
  return await web3.utils.toWei(amount);
};
export const quote = async (amountIn, reserveIn, reserveOut) => {
  let result=await uniSwapContract.methods.getAmountOut(await toWei(amountIn),await toWei(reserveIn),await toWei(reserveOut)).call()
  return await fromWei(result.toString())
};
export const getReserves=async()=>{
  return await poolContract.methods.getReserves().call()
}
export const swap=async(account,amount)=>{
      let path=["0x3E5c715e8a0836B1637F9971A69376fe4d699A35"]
      let swap=await uniSwapContract.methods.swapExactTokensForETH(await toWei(amount),"10000000000000000000000000000",path,account,"10000000000000000000000000000").send({from:account})
      console.log(swap)
    }
