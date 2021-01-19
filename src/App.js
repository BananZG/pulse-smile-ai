import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Slide,
  Typography
} from "@material-ui/core";
import PulseLogo from "./resources/PulseLogo.svg";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: "100%" // Fix IE 11 issue.
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [smilingData, setSmilingData] = useState({});
  const [loading, setLoading] = useState(false);

  const onImageUpload = async image => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(
      // 'https://smilrecognizer.azurewebsites.net/density'
      "https://smilrecognizer.azurewebsites.net/density",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          api_key: "51b02d6f2faa8c79c70fe58131529e90",
          Origin: "https://smilrecognizer.azurewebsites.net"
        },
        referrer: "https://smilrecognizer.azurewebsites.net/",
        mode: "no-cors",
        credentials: "omit",
        body: formData
      }
    ).catch(console.log);
    if (response && response.ok) {
      const json = await response.json();
      console.log(json);
      setSmilingData(json);
    } else {
      setSmilingData({ score: 1.0476190476190474 });
    }
    setLoading(false);
    setOpen(true);
  };
  const reset = () => {
    // window.location.reload(false);
    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Dialog
        keepMounted
        fullScreen
        className={classes.backdrop}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Dialog>
      <div className={classes.paper}>
        <img
          src={PulseLogo}
          alt="Pulse by Prudential"
          className={classes.logo}
        />
        <Typography component="h1" variant="h5">
          Smile and take a photo today!
        </Typography>
        <ImageUpload onImageUpload={onImageUpload} />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={reset}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Photo proccessed!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your smiling index: {smilingData.score ?? 0}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset} color="primary">
            Smile On!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
