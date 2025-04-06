"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { CameraIcon, CheckCircle } from "lucide-react";

interface UploadFormProps {
  acceptFormats: { [key: string]: string[] }; // Example: { "image/*": [] } or { "audio/mp3": [] }
  onUploadComplete: (result: { url?: string; error?: string }) => void;
}

export default function UploadForm({
  acceptFormats,
  onUploadComplete,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFormats, // Dynamically pass allowed formats
    maxFiles: 1,
  });

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "pictures");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = async () => {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        onUploadComplete({ url: response.url });
      } else {
        onUploadComplete({ error: response.error || "Upload failed" });
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      onUploadComplete({ error: "Network error" });
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg text-center w-96 min-w-96">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <p className="text-sm text-gray-500 mt-4">
              Picture has been selected, now press upload.
            </p>
          </div>
        ) : isDragActive ? (
          <p>Drop the picture here...</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CameraIcon className="w-10 h-10 text-gray-500" />
            <p className="text-sm text-gray-500">
              Drag & drop a picture here, or click to select one
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex flex-col items-center justify-center mt-4">
          {uploading ? (
            <Spinner />
          ) : (
            <Button onClick={uploadFile} className="bg-slate-900 text-white">
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
