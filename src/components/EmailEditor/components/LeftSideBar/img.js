import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

export default function ImageUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://www.megadolls.com/api/upload_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image URL:", response.data.image_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <div>
      <input
        {...getRootProps()}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}
