/**
 * get cropped image
 * 
 * 
 */

export async function getCroppedImg(imageSrc, pixelCrop) {
  const image = new Image();
  image.src = imageSrc;
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  // We need to determine the MIME type
  const mimeType = imageSrc.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  const format = mimeType ? mimeType[1] : 'image/jpeg'; // Default to jpeg if not found

  return new Promise((resolve, reject) => {
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
