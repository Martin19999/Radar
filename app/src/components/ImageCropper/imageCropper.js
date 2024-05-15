/**
 * ImageCropper Component.
 * 
 * 
 */

import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './getCroppedImage'; 
import { useEasyToast } from '../toast';

import "../../styles/common.css";
import "../../styles/settings.css";

const ImageCropper = ({ imageSrc, onImageCropped, onCropComplete, setCropped }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { showSuccess, showErrorNonFirebase } = useEasyToast();

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //   setCroppedAreaPixels(croppedAreaPixels);
  // }, []);

  const cropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onImageCropped(croppedImage);
      setCropped(true);
      showSuccess("Image cropped!");
    } catch (e) {
      showErrorNonFirebase(e);
    }
  };

  onCropComplete(cropImage);

  return (
    <div className='image-cropper-field'>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1} // Square aspect ratio
        onCropChange={(newCrop) => {
          setCrop(newCrop);
          setCropped(false);  
        }}
        onZoomChange={(newZoom) => {
          setZoom(newZoom);
          setCropped(false);  
        }}
        onCropComplete={(croppedArea, croppedPixels) => {
          setCroppedAreaPixels(croppedPixels);}}
      />
    </div>
  );
};

export default ImageCropper;
