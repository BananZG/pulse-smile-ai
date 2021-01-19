import React, { useState } from "react";
import { Fab, Button, Dialog } from "@material-ui/core";
import Webcam from "react-webcam";
import CameraAlt from "@material-ui/icons/CameraAlt";

const videoConstraints = {
  width: 120,
  height: 140,
  facingMode: "user"
};

export default function TakeSelfie({ onCapture }) {
  const [showCam, setShowCam] = useState(false);
  const webcamRef = React.useRef(null);

  const onTakeSelfie = () => {
    setShowCam(true);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setShowCam(false);
  }, [webcamRef]);

  return (
    <div>
      <Fab color="primary" onClick={onTakeSelfie}>
        <CameraAlt />
      </Fab>
      <Dialog open={showCam}>
        <Webcam
          audio={false}
          height={580}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />
        <Button color="primary" onClick={capture}>
          Capture
        </Button>
        <Button color="secondary" onClick={() => setShowCam(false)}>
          Close
        </Button>
      </Dialog>
    </div>
  );
}
