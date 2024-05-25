/**
 * get cropped image
 * 
 * 
 */

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
  }

export async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }
    // We need to determine the MIME type
    const mimeType = imageSrc.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    const format = mimeType ? mimeType[1] : 'image/jpeg'; // Default to jpeg if not found

    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      canvas.toBlob(blob => {
        if (blob) {
            resolve(blob);
        } else {
            reject(new Error('Canvas to Blob failed'));
        }
      }, format); // Use detected MIME type
    };
    image.onerror = () => {
        reject(new Error('Image loading error'));
    };
  });
}
