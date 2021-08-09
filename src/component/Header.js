import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

import { Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { conciseAddress } from "../utils/formatters.js";
import ConnectWalletModal from "./Modals/ConnectWalletModal.js";

const useStyles = makeStyles((theme) => ({
  connectBtn: {
    color: "#090613",
    width: 240,
    height: 50,
    fontWeight: "500",
    fontSize: 18,
    lineHeight: "10px",
    textTransform: "capitalize",
    marginRight: 10,
  },

  connectBtnContainer: {
    marginBottom: 30,
    display: "flex",
    // alignItems: "center",

    justifyContent: "space-between",
    marginRight: 16,

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      marginRight: 0,
    },

    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },

  connectWalletContainer: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
      justifyContent: "flex-end",
      display: "flex",
    },
  },

  modal: {
    display: "flex",
    // marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    fontSize: 14,
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      marginLeft: 10,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 10,
    },
  },

  infoContainer: {
    background:
      "linear-gradient(139.63deg, rgba(96, 83, 132, 0.7) -23.88%, rgba(15, 8, 36, 0.7) 100%)",
    border: "1px solid rgba(230, 231, 233, 0.1)",
    borderRadius: 10,
    minHeight: 40,
    padding: "0 30px",

    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
      // minHeight: 100,
      width: "80%",
      justifyContent: "center",
      alignSelf: "center",
    },

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "90%",
      minHeight: 100,
      justifyContent: "center",
    },
  },

  connectedBtn: {
    background: "rgba(15, 8, 36, 0.55)",
    border: "1px solid rgba(255, 255, 255, 0.28)",
    borderRadius: "10px",

    [theme.breakpoints.down("500")]: {
      width: 200,
    },

    [theme.breakpoints.down("400")]: {
      width: 170,
      marginRight: 8,
    },
  },

  connectedText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: "14px",
    fontWeight: 400,
  },

  activeDot: {
    background: "linear-gradient(180deg, #00E2FE 0%, #19FADD 100%)",
    height: 20,
    width: 20,
    borderRadius: 100,
    marginRight: 10,
  },

  networkBtn: {
    height: 50,
    background: "rgba(15, 8, 36, 0.55)",
    border: "1px solid rgba(255, 255, 255, 0.28)",
    borderRadius: "10px",
    marginRight: 15,
    width: 90,

    [theme.breakpoints.down("500")]: {
      width: 90,
    },

    [theme.breakpoints.down("400")]: {
      width: 80,
      marginRight: 8,
    },
  },

  networkImage: {
    height: 20,
    width: 20,
    marginRight: 8,
  },

  InfoButton: {
    padding: 0,
    [theme.breakpoints.down("500")]: {},
  },
}));

const Header = () => {
  const web3context = useWeb3React();

  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);

  return (
    <>
      <Box className={classes.connectBtnContainer}>
        <Box></Box>
        

        <Box className={classes.connectWalletContainer}>
          {web3context.active &&
          web3context.account &&
          web3context.chainId === 4 ? (
            <Button className={classes.networkBtn}>
              <Typography className={classes.connectedText}>ETH</Typography>
            </Button>
          ) : web3context.chainId === 97 || web3context.chainId === 56 ? (
            <Button className={classes.networkBtn}>
              <Typography className={classes.connectedText}>BNB</Typography>
            </Button>
          ) : null}
          <Button
            variant={
              web3context.active && web3context.account
                ? "outlined"
                : "contained"
            }
            startIcon={
              !web3context.active && !web3context.account && <AddIcon />
            }
            onClick={() => setModal(true)}
            className={[
              classes.connectBtn,
              web3context.account && classes.connectedBtn,
            ]}
          >
            {web3context.active && web3context.account && (
              <div className={classes.activeDot}></div>
            )}
            <Typography
              className={[web3context.account && classes.connectedText]}
            >
              {web3context.active && web3context.account
                ? conciseAddress(web3context.account)
                : "CONNECT WALLET"}
            </Typography>
          </Button>

          <Button
            onClick={() => setHelpModal(true)}
            className={classes.InfoButton}
          >
            {/* <img src={InfoIcon} /> */}
          </Button>
        </Box>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={() => setModal(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <ConnectWalletModal onSuccess={() => setModal(false)} />
        </Fade>
      </Modal>
    </>
  );
};

export default Header;
