import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Grid, Typography } from "@material-ui/core";
import Header from "../component/Header";
import DropDown from "../component/Dropdown";
import { useEffect, useState } from "react";
import {
  fromWei,
  getBalanceMav,
  getEthBalance,
  getReserves,
  quote,
  swap,
} from "../contract/functions/web3functions";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "65%",
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#191b1f",
    borderRadius: "20px",
  },
  text: {
    marginTop: "20px",
    marginLeft: "20px",
    color: "white",
  },
  ethBar: {
    color: "white",
    backgroundColor: "#212429",
    width: "90%",
    height: "10vh",
    borderRadius: "20px",
    marginLeft: "27px",
    marginTop: "40px",
  },
  button:{
    width:"90%",
    marginTop:"20px",
    marginLeft:"25px",
    borderRadius: "20px",
    height:"50px"
  }
}));
function SwapCard({ tokenBalance, ethBalance,account }) {
  let onEthInput = async (input) => {
    setEthInput(input.target.value.toString());
    if (input.target.value > 0 && !!input.target.value) {
      let reserves = await getReserves();
      let quoteResult = await quote(
        input.target.value,
        reserves._reserve0,
        reserves._reserve1
      );
      setTokenInput(Number(quoteResult).toFixed(2));
    } else {
      setTokenInput("0.0");
    }
  };
  let onTokenInput = async (input) => {
    setTokenInput(input.target.value.toString());
    if (input.target.value > 0 && !!input.target.value) {
      let reserves = await getReserves();

      let quoteResult = await quote(
        input.target.value,
        reserves._reserve1,
        reserves._reserve0
      );
      setEthInput(Number(quoteResult).toFixed(7));
    } else {
      setEthInput("0.0");
    }
  };
  let [ethInput, setEthInput] = useState("0.0");
  let [tokenInput, setTokenInput] = useState("0.0");
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Header />

        <Card className={classes.card}>
          <Grid className={classes.text}>
            <Typography variant="h6">Swap</Typography>
          </Grid>
          <Grid>
            <Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className={classes.ethBar}
              >
                <Grid
                  direction="row"
                  justifyContent="flex-end"
                  style={{
                    marginLeft: "20px",
                    backgroundColor: "#191b1f",
                    borderRadius: "20px",
                    width: "15%",
                  }}
                >
                  <Typography variant="h6" style={{ marginLeft: "10px" }}>
                    MAV
                  </Typography>
                </Grid>

                <Grid>
                  <input
                    style={{
                      backgroundColor: "#212429",
                      border: 0,
                      fontSize: "20px",
                      width: "10vw",
                    }}
                    value={tokenInput}
                    onChange={onTokenInput}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Typography
                  variant="p"
                  style={{
                    marginLeft: "50px",
                    marginTop: "10px",
                    color: "white",
                  }}
                >
                  {`Mav available: ${tokenBalance}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.ethBar}
            >
              <Grid
                direction="row"
                justifyContent="flex-end"
                style={{
                  marginLeft: "20px",
                  backgroundColor: "#191b1f",
                  borderRadius: "20px",
                  width: "15%",
                }}
              >
                <Typography variant="h6" style={{ marginLeft: "10px" }}>
                  ETH
                </Typography>
              </Grid>
              <Grid>
                <input
                  style={{
                    backgroundColor: "#212429",
                    border: 0,
                    fontSize: "20px",
                    width: "10vw",
                    "&:focus": {
                      border: 0,
                    },
                  }}
                  value={ethInput}
                  onChange={onEthInput}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Typography
                variant="p"
                style={{
                  marginLeft: "50px",
                  marginTop: "10px",
                  color: "white",
                }}
              >
                {`Mav available: ${Number(ethBalance).toFixed(4)}`}
              </Typography>
              
            </Grid>
            <Button onClick={async()=>await swap(account,ethInput)} className={classes.button} disabled={ethInput>0?false:true} variant="contained" color="primary">
              Swap
            </Button>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}

export default SwapCard;
