import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      console.log(
        "Upload event triggered:",
        result.event,
        "Full result:",
        result
      );
      if (result.event === "success") {
        const secureUrl = result.info.secure_url;
        console.log("Upload succeeded! Secure URL:", secureUrl);
        onChange(secureUrl);
      } else if (result.event === "error") {
        console.error("Upload error:", result.info);
      } else {
        console.log("Other event:", result.event, "Info:", result.info);
      }
    },
    [onChange]
  );

  console.log("ImageUpload rendered with value:", value); // Debug value persistence

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="something" // Replace with your actual preset
      options={{
        maxFiles: 1,
        sources: ["local", "camera"],
        multiple: false,
        clientAllowedFormats: ["jpg", "png", "jpeg"],
      }}
    >
      {({ open }) => {
        console.log("CldUploadWidget props:", { open }); // Debug what’s passed
        return (
          <div
            onClick={() => {
              if (open) {
                console.log("Opening upload widget");
                open();
              } else {
                console.error("Upload widget 'open' function is undefined");
              }
            }}
            className="
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed
          border-2
          p-20
          border-neutral-300
          flex
          flex-col
          justify-center
          items-center
          gap-4
          text-neutral-600
        "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
