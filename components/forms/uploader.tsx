"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import {
  CameraIcon,
  CheckCheck,
  CheckCircle,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import React from "react";

interface UploadFormProps {
  acceptFormats: { [key: string]: string[] }; // Example: { "image/*": [] } or { "audio/mp3": [] }
  onUploadComplete: (result: { url?: string; error?: string }) => void;
  text: string;
  icon: LucideIcon;
}

export default function Uploader({
  acceptFormats,
  onUploadComplete,
  icon,
  text,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      uploadFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFormats, // Dynamically pass allowed formats
    maxFiles: 1,
  });

  const uploadFile = async (val: File) => {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", val);
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
      setFile(null);
      onUploadComplete({ error: "Network error" });
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className="p-2 border border-gray-300 rounded-lg w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-2">
            {icon && React.createElement(icon)}
            <p className="text-sm text-gray-500">{text}</p>
          </div>

          {uploading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div>{file && <CheckCircle2 color="green" />}</div>
          )}
        </div>
      </div>
    </div>
  );
}
