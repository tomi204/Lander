import React, { ChangeEvent, FC, useState } from "react";
import axios from "axios";
import ImageSlider from "./ImageSlider";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { Media } from "@/interfaces/Strapi";
import Cookies from "js-cookie";

interface FileUploaderProps {
  id: string;
  label: string;
  multiple?: boolean;
  onUpload?: (files: any[]) => void;
}

const FileUploader: FC<FileUploaderProps> = ({
  id,
  label,
  multiple = false,
  onUpload,
}) => {
  const [files, setFiles] = useState<
    { file: File; preview: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        description: "",
      }));
      setFiles(fileArray);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, description: value } : file
      )
    );
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  const uploadFiles = async () => {
    const allDescriptionsFilled = files.every(
      (file) => file.description.trim() !== ""
    );

    if (!allDescriptionsFilled) {
      setValidationError(true);
      return;
    }

    setValidationError(false);

    try {
      setLoading(true);
      const formData = new FormData();

      files.forEach(({ file, description }) => {
        // Append the file with a description as the name
        formData.append("files", file, description);
      });

      const url = process.env.NEXT_PUBLIC_URL
        ? `${process.env.NEXT_PUBLIC_URL}/api/upload`
        : "";
      const response = await axios.post<Media[]>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });

      onUpload && onUpload(response.data);

      setMessage("Upload successful");
    } catch (error) {
      console.error("Error uploading files:", error);
      setMessage("Error uploading files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="text-lg font-semibold">{label}</span>
      <div className="mt-5">
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
              <label
                htmlFor={id}
                className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <span>Upload a file</span>
                <input
                  id={id}
                  name={id}
                  type="file"
                  multiple={multiple}
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        <div className="mt-5">
          <ImageSlider
            images={files}
            onDescriptionChange={handleDescriptionChange}
            onDelete={handleDelete}
            validationError={validationError} // Pasa validationError como prop a ImageSlider
          />
        </div>
      </div>
      <ButtonSecondary onClick={uploadFiles} disabled={loading} type="button">
        {loading ? "Uploading..." : "Upload Images"}
      </ButtonSecondary>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploader;
