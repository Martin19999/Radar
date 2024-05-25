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

interface ImageCropperProps {
  imageSrc: string;
  onImageCropped: (croppedImage: Blob) => void;  // Assuming onImageCropped expects a Blob
  onCropComplete: (cropAction: () => Promise<void>) => void;
  setCropped: (isCropped: boolean) => void;
}

interface Crop {
  x: number;
  y: number;
}

interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onImageCropped, onCropComplete, setCropped }) => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const { showSuccess, showErrorNonFirebase } = useEasyToast();

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //   setCroppedAreaPixels(croppedAreaPixels);
  // }, []);

  const cropImage = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onImageCropped(croppedImage);
        setCropped(true);
        showSuccess("Image cropped!");
      } catch (e) {
        showErrorNonFirebase((e as Error).message);
      }
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
