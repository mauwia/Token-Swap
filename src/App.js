import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/getLibrary";
import ConnectWallet from "./containers/ConnectWallet";
import { makeStyles } from "@material-ui/core/styles";
import SwapCard from "./containers/SwapCard";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgb(2,0,36)",
    background:" linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,104,1) 100%, rgba(0,212,255,1) 100%)",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className={classes.root}>
        <ConnectWallet />
        <SwapCard/>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
