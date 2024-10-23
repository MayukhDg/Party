"use client";

import { UploadButton } from "@/lib/uploadthing";


export default function UploadImageButton({setPartyPhoto}) {
  return (
      <UploadButton
       className="mt-[22px]"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log(setPartyPhoto(res[0].url));
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    
  );
}