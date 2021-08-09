import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import React, { useCallback } from "react";
// import { useSnackbar } from "../../hooks/uiHooks";
import { injected } from "../../utils/web3Connector";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// import { MetaMaskIcon, TrustWalletIcon } from "../../assets";
import { BrowserView, MobileView } from "react-device-detect";
import { walletconnect } from "../../utils/web3ConnectFunctions";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 30,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 24,
  },

  contentContainer: {
    width: 400,
    background:
      "linear-gradient(139.63deg, rgba(96, 83, 132, 0.7) -23.88%, rgba(15, 8, 36, 0.7) 100%)",
    border: "2px solid rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  button: {
    width: "100%",
    marginBottom: 16,
    height: 50,
    display: "flex",

    [theme.breakpoints.down("960")]: {
      minWidth: 272,
    },
  },
}));

const ConnectWalletModal = ({ onSuccess }) => {
  const classes = useStyles();

  const web3context = useWeb3React();

  // const { showSnackbarF } = useSnackbar();

  // const { web3context } = useWeb3();

  console.log(
    "xxxx => ",
    web3context?.connector instanceof WalletConnectConnector,
    web3context?.connector instanceof InjectedConnector
  );

  const activateTrustWallet = () => {
    web3context.activate(walletconnect);
  };

  const deactivateWallet = async () => {
    await web3context.deactivate();
    console.log(web3context, "TEST", web3context.active);
    if (web3context?.connector instanceof WalletConnectConnector) {
      await web3context.connector.close();
    }

    onSuccess();
  };

  const getErrorMessage = (e) => {
    if (e instanceof UnsupportedChainIdError) {
      return "Unsupported Network";
    } else if (e instanceof NoEthereumProviderError) {
      return "No Wallet Found";
    } else if (e instanceof UserRejectedRequestError) {
      return "Wallet Connection Rejected";
    } else if (e.code === -32002) {
      return "Wallet Connection Request Pending";
    } else {
      return "An Error Occurred";
    }
  };

  const activateWallet = useCallback(
    (connector, onClose = () => {}) => {
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined;
      }

      web3context
        .activate(
          connector
            ? connector
            : new InjectedConnector({
                supportedChainIds: [1, 3, 4, 5, 42, 97, 56],
              }),
          undefined,
          true
        )
        .then(() => {
          //   setLoadingF({ walletConnection: false });
          //getJWTF(web3context.account, Date.now());

          onSuccess();
        })
        .catch((e) => {
          const err = getErrorMessage(e);
          // showSnackbarF({ message: err, severity: "error" });
          console.error("ERROR activateWallet -> ", e);
          //   setLoadingF({ walletConnection: false });
        });
    },
    [web3context]
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography className={classes.heading}>Connect Wallet</Typography>
      <Box
        className={classes.contentContainer}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <BrowserView style={{ width: "100%" }}>
          <Button
            variant="contained"
            onClick={() =>
              !web3context.active &&
              !(web3context?.connector instanceof InjectedConnector)
                ? activateWallet(injected)
                : deactivateWallet()
            }
            className={classes.button}
            endIcon={
              web3context.active &&
              web3context?.connector instanceof InjectedConnector && (
                <CheckCircleIcon />
              )
            }
          >
            {/* <img src={MetaMaskIcon} style={{ marginRight: 10 }} /> */}
            <Typography>
              {web3context.active &&
              web3context?.connector instanceof InjectedConnector
                ? "Disconnect Metamask"
                : "Metamask"}
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              !web3context.active &&
              !(web3context?.connector instanceof WalletConnectConnector)
                ? activateWallet(walletconnect)
                : deactivateWallet();
            }}
            className={classes.button}
            endIcon={
              web3context.active &&
              web3context?.connector instanceof WalletConnectConnector && (
                <CheckCircleIcon />
              )
            }
          >
            {/* <img src={TrustWalletIcon} style={{ marginRight: 2 }} /> */}
            <Typography>
              {web3context.active &&
              web3context?.connector instanceof WalletConnectConnector
                ? "Disconnect Trust Wallet"
                : "Trust Wallet"}
            </Typography>
          </Button>
        </BrowserView>
        <MobileView style={{ width: "100%" }}>
          <Button
            variant="contained"
            onClick={() => {
              !web3context.active &&
              !(web3context?.connector instanceof WalletConnectConnector)
                ? activateWallet(walletconnect)
                : deactivateWallet();
            }}
            className={classes.button}
            endIcon={
              web3context.active &&
              web3context?.connector instanceof WalletConnectConnector && (
                <CheckCircleIcon />
              )
            }
          >
            <Typography>
              {web3context.active &&
              web3context?.connector instanceof WalletConnectConnector
                ? "Disconnect Wallet"
                : "Connect Wallet"}
            </Typography>
          </Button>
        </MobileView>
      </Box>
    </Box>
  );
};

export default ConnectWalletModal;
