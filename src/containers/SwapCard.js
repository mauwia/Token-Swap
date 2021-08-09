import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import Header from "../component/Header";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "50%",
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
}));
function SwapCard() {
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
                  width: "12%",
                }}
              >
                <Typography variant="h6" style={{ marginLeft: "10px" }}>
                  Eth
                </Typography>
              </Grid>
              <Grid>
                <input style={{
                  backgroundColor:"#212429",
                  border:0,
                  fontSize:"20px",
                  "&:focus": {
                    border:0
                  }
                }} value="0.0"/>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.ethBar}
            >
              <Grid style={{ marginLeft: "20px", backgroundColor: "" }}>
                <Typography>Select A Token</Typography>
              </Grid>
              <Grid>
              <input style={{
                  backgroundColor:"#212429",
                  border:0,
                  fontSize:"20px"
                }} value="0.0"/>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}

export default SwapCard;
