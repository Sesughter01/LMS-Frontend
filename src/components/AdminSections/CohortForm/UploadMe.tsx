import React, { useCallback, useEffect, useState, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { useDropzone } from "react-dropzone";
import { ImFilePicture } from "react-icons/im";
import ReactModal from "react-modal";
import Cropper from "react-easy-crop";
import { AiOutlineClose } from "react-icons/ai";
import getCroppedImg from "../../../../utilComponents/getCropped";

interface Props {
  onChange: (file?: File) => void;
  error?: string;
  isDisabled?: boolean;
  file?: File;
}

export function UploadMe({ onChange, error, isDisabled = false, file }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File>();

  const [modalOpen, setModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [imageURL, setImageURL] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: FileList | null) => {
    if (!acceptedFiles) return;

    if (!acceptedFiles.length) {
      return;
    }

    const file = acceptedFiles[0];

    const acceptedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml"];
    if (!acceptedTypes.includes(file.type)) {
      return;
    }

    setModalOpen(true);
    setSelectedImage(file);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setImageURL(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop as any,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    multiple: false,
  });

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveImage = async () => {
    const croppedImage = await getCroppedImg(
      imageURL,
      croppedAreaPixels,
      selectedImage
    );
    
    // setImageURL(URL.createObjectURL(croppedImage));
    setModalOpen(false);

    // onChange(selectedImage);
    onChange(croppedImage);
  };

  const editImage = () => {
    // Reset the image selection
    // setSelectedImage(undefined);
    // onChange();
    // setFile(null)
    console.log('fileRef', fileRef)
    // fileRef.current.click()
  };

  const downloadImage = () => {
    // console.log("selectedImage", selectedImage, imageURL)
    // console.log("file", file)
    const anchor = document.createElement('a');
    if(file){
      const blobUrl = URL.createObjectURL(file);
      anchor.href = blobUrl;
      anchor.download = "cohort_image"; 
      anchor.click();
      URL.revokeObjectURL(blobUrl);
    }else if(selectedImage){
      anchor.href = URL.createObjectURL(selectedImage);
      anchor.download = selectedImage.name; 
      anchor.click();
    }     

    anchor.remove();  
  };

  return (
    <div className="w-full file-upload-input">
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        selectedImage={selectedImage ?? null}
        imageURL={imageURL}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onSave={handleSaveImage}
        onCropComplete={onCropComplete}
      />

      {!file ? (
        <label className="h-40 w-[545px] mx-auto">
          <input
            ref={fileRef}
            {...getInputProps()}
            onChange={(e) => onDrop(e.target.files)}
            className="hidden opacity-0"
            id="fileRef"
            type="file"
          />
          <div className="dropzone-container cursor-pointer border-dashed border-[#BABABA] w-[545px] mx-auto bg-white border-[1.5px] p-5 rounded-lg h-full flex flex-col justify-center items-center">
            {/* {isDragActive ? (
              <p>Drop image here...</p>
            ) : ( */}
            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-4">
                <ImFilePicture className="text-[#7A7A7A] text-3xl" />
                <div>
                  <p className="text-xs text-[#7A7A7A] font-medium">
                    Upload the cohort cover image here.
                  </p>
                  <p className="text-xs text-[#7A7A7A] font-medium">
                    <span className="text-[#FF00F8]">Browse</span> or drop your
                    file here
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-10 text-xs text-[#7A7A7A] mt-5 font-medium">
                <p>. Recommended aspect ratio: 16:9</p>
                <p>
                  . Max file size: <span className="font-semibold">15MB</span>
                </p>
              </div>
            </div>
            {/* )} */}
          </div>
          {error && (
            <div className="error-message flex justify-center items-center ">
              {error}
            </div>
          )}
        </label>
      ) : (
      <>
        <div
          className="mt-5 bg-cover w-[755px] h-[177px] bg-center outline outline-2 outline-offset-2 outline-slate-300
          rounded-lg flex flex-col justify-center mx-auto px-8 relative"
          style={{
            backgroundImage: `url(${URL.createObjectURL(file)})`,
          }}
        >
          {file && (
            <div className="flex justify-center items-center gap-4 absolute top-0 left-0 opacity-0 right-0 bottom-0 transition-opacity duration-300 hover:opacity-100 bg-gray-300 bg-opacity-50">
              <div className="bg-white py-2 px-2 rounded-lg">
                <div
                  className="secondary-btn flex items-center gap-2 hover:opacity-75"
                  onClick={downloadImage}
                  disabled={isDisabled}
                >
                  <HiOutlineDownload size={20} />
                </div>
              </div>

              <div className="bg-white py-2 px-2 rounded-lg">
                <div
                  className="secondary-btn flex items-center gap-2 hover:opacity-75"
                  onClick={() => {
                    onChange();
                    setSelectedImage(undefined);
                  }}
                  disabled={isDisabled}
                >
                  <RiDeleteBinLine size={20} />
                </div>
              </div>

              {/*<div className="bg-white py-2 px-2 rounded-lg">
                <div
                  className="secondary-btn flex items-center gap-2 hover:opacity-75"
                  onClick={editImage}
                  disabled={isDisabled}
                >
                  <BiEdit size={20} />
                </div>
              </div>*/}
            </div>
          )}
        </div>
        {error && (
            <div className="error-message flex justify-center items-center ">
              {error}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .dropzone-container {
          transition: 0.25s ease;
        }

        .dropzone-container:hover {
          transform: scale(0.98);
        }

        .error-message {
          color: red;
          font-size: 12px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}

const Modal = ({
  isOpen,
  onRequestClose,
  selectedImage,
  imageURL,
  crop,
  setCrop,
  zoom,
  setZoom,
  onSave,
  onCropComplete,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImage: File | null;
  imageURL: string;
  crop: { x: number; y: number };
  setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onSave: () => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          backgroundColor: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          maxHeight: "750px",
          margin: "auto",
          // padding: "20px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
        },
      }}
    >
      {selectedImage ? (
        <>
          <div className="bg-white">
            <div className="flex items-center justify-between">
              <p className="text-menu text-xl font-medium">Edit Image</p>
              <AiOutlineClose
                className="text-menu text-xl font-medium"
                onClick={onRequestClose}
              />
            </div>
            <div className="w-full bg-gray-200 h-[2px] my-6"></div>
          </div>

          <Cropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                position: "relative",
                width: "100%",
                paddingTop: "55%",
                borderRadius: "8px",
              },
              cropAreaStyle: {
                position: "absolute",
                boxSizing: "border-box",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "509px",
                height: "119px",
                right: 0,
                bottom: 0,
                zIndex: 2, // Set a higher z-index
              },
              mediaStyle: {
                position: "absolute",
                zIndex: 1,
              },
            }}
          />

          <div className="bg-white p-4 mt-5">
            <ul className="list-disc">
              <li className="text-menu text-lg font-medium mb-3">
                File formats accepted: PNG, JPG, JPEG
              </li>
              <li className="text-menu text-lg font-medium mb-3">
                Max file size: 15 MB
              </li>
              <li className="text-menu text-lg font-medium mb-3">
                Use minimum dimension of 150 x 150
              </li>
              <li className="text-menu text-lg font-medium">
                Please take into consideration the image file size
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end mt-5">
            <button
              onClick={onSave}
              className="bg-menu px-8 py-2 text-white font-medium text-lg rounded-lg"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <p>No image selected</p>
      )}
    </ReactModal>
  );
};
