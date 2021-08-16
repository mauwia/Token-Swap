import { Web3ReactProvider } from "@web3-react/core";
import ConnectWallet from "./containers/ConnectWallet";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3React } from "@web3-react/core";
import SwapCard from "./containers/SwapCard";
import { fromWei, initializeWeb3 } from "./contract/functions/web3functions";
import { useEffect, useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgb(2,0,36)",
    background:
      " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,104,1) 100%, rgba(0,212,255,1) 100%)",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
function App() {
  const web3Context = useWeb3React();
  const classes = useStyles();
  let [tokenBalance, setTokenBalance] = useState(null);
  let [ethBalance,setEthBalance]=useState(null)

  useEffect(() => {
    let init = async () => {
      console.log("here1", web3Context);
      if (web3Context?.library?.currentProvider) {
        await initializeWeb3(
          "0x99e3ca20930121fa16cf1153e3fcdea07cfa66e2",
          web3Context?.library?.currentProvider,web3Context.account,setTokenBalance,setEthBalance
        );
      }

    };
    init();
  }, [web3Context]);
  return (
    <div className={classes.root}>
      <ConnectWallet />
      <SwapCard tokenBalance={tokenBalance} account={web3Context.account} ethBalance={ethBalance} />
    </div>
  );
}

export default App;
