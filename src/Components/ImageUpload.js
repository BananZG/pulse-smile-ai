// imports the React Javascript Library
import React, { useState } from "react";
//Card
import { Card, Container, Button, Fab, Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import { blue } from "@material-ui/core/colors";

import TakeSelfie from "./TakeSelfie";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

//Tabs
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  icon: {
    margin: theme.spacing(2)
  },
  input: {
    display: "none"
  },
  button: {
    color: blue[900],
    margin: 10
  }
}));

export default function ImageUploadCard({ onImageUpload }) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      setSelectedImage(reader.result);
    }.bind(this);
    setSelectedFile(event.target.files[0]);
  };

  const onCapture = file => {
    setSelectedImage(file);
    setSelectedFile(new File([file], "selfie.jpeg"));
  };

  const renderInitialState = () => {
    return (
      <React.Fragment>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <TakeSelfie onCapture={onCapture} />
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  };

  const imageResetHandler = event => {
    setSelectedFile(null);
    setSelectedImage(null);
  };

  const renderUploadedState = () => {
    return (
      <React.Fragment>
        <CardActionArea onClick={imageResetHandler}>
          <img width="100%" className={classes.media} src={selectedImage} />
          <label>Tap to remove</label>
        </CardActionArea>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Container className={classes.form}>
        <Card>
          {(!!selectedImage && renderUploadedState()) || renderInitialState()}
        </Card>
        <Button
          type="submit"
          disabled={!selectedFile}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => onImageUpload(selectedFile)}
        >
          Upload
        </Button>
      </Container>
    </React.Fragment>
  );
}
