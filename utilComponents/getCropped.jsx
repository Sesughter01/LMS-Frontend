const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = src;
  });
};

const getCroppedImg = async (imageSrc, crop, originalFile) => {
  try {
    const image = await loadImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to the size of the cropped image
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Draw image on canvas
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convert the canvas to a blob and return as a file
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const fileExtension = originalFile.name.split(".").pop().toLowerCase();
        const mimeType = `image/${
          fileExtension === "jpg" ? "jpeg" : fileExtension
        }`;
        const croppedImage = new File([blob], "croppedImage.jpg", {
          type: mimeType,
        });
        resolve(croppedImage);
      }, "image/jpeg");
    });
  } catch (error) {
    throw error;
  }
};

export default getCroppedImg;
