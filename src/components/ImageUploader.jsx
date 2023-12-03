import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, CheckCircle, AlertTriangle } from "react-feather";
import useImageClassifier from "../hooks/useImageClassifier";
import { quantum } from "ldrs";

quantum.register();

const ImageUploader = () => {
  const [imageId, setImageId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { classificationResult, error, isLoading } =
    useImageClassifier(imageId);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  const readImageAsDataURL = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    });
  };

  const handleImageUpload = async () => {
    const uniqueImageId = `image_${new Date().getTime()}`;

    if (selectedImage) {
      const image = await readImageAsDataURL(selectedImage);
      setUploadedImage(image);
      setImageId(uniqueImageId);
    }
  };

  useEffect(() => {}, [imageId]);

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white shadow-md rounded-lg ">
      <div
        {...getRootProps()}
        className={`border-2 cursor-pointer duration-200 border-dashed rounded-lg p-4 flex flex-col items-center justify-center ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {selectedImage ? (
          <div className="relative">
            <img
              id={imageId}
              src={uploadedImage}
              alt="Selected"
              className="hidden"
            />
            <img
              src={URL.createObjectURL(selectedImage)}
              alt=""
              className="rounded-lg object-fill"
            />

            {isLoading && (
              <div className="absolute w-full h-full top-0 rounded-lg  z-10  flex items-center justify-center">
                <div className="absolute w-full h-full top-0 rounded-lg opacity-30 bg-slate-800"></div>
                <l-quantum size="50" speed="2.75" color="white"></l-quantum>
              </div>
            )}
          </div>
        ) : (
          <>
            <UploadCloud size={48} className="text-gray-400 mb-2" />
            <p className="text-center text-slate-600">
              Drag & drop an image here, or click to select one
            </p>
          </>
        )}
      </div>
      <button
        onClick={handleImageUpload}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm  hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${selectedImage && isLoading ? "cursor-not-allowed": ""}`}
        disabled={!selectedImage && isLoading}
      >
        Classify
      </button>
      {error && imageId == !null && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
          <AlertTriangle size={20} className="text-red-500 mr-2" />
          <div>
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      )}
      {classificationResult && !isLoading && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
          <CheckCircle size={20} className="text-green-500 mr-2" />
          <div>
            <p className="font-bold">Classification Result:</p>
            <p>{classificationResult}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
