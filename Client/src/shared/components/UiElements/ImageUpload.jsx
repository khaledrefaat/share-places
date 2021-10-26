import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import {
  imageUpload,
  imageUpload__preview,
  center,
} from './ImageUpload.module.scss';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = e => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={''}>
      <input
        id={props.id}
        style={{ display: 'none' }}
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`${imageUpload} ${props.center && center}`}>
        <div className={imageUpload__preview}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <Button
          onClick={pickImageHandler}
          variant="contained"
          color="secondary"
          type="button"
        >
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
