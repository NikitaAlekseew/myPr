// @ts-ignore
import { useEffect, useState, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";

import {
  thumbsContainer,
  thumb,
  thumbInner,
  img,
  deleteButton,
} from "./MultipleImageLoaderStyle";

import { Container, createTheme, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { BsPlusSquareDotted } from "react-icons/bs";
import styles from "./MultipleImageLoader.module.scss";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica, Arial, sans-serif",
  },
});

interface FileWithPreview extends File {
  id: string;
  preview: string;
}

interface ExistingFile {
  id: string;
  name: string;
  preview: string;
}

interface MultipleImageLoaderProps {
  files?: ExistingFile[];
  onFilesChange: (files: File[]) => void;
}

function MultipleImageLoader({
  files = [],
  onFilesChange,
}: MultipleImageLoaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const [modifiedFiles, setModifiedFiles] = useState<File[]>([]);

  useEffect(() => {
    const initialFiles = files?.map(
      (file) =>
        ({
          ...new File([], file.name),
          id: file.id || `${file.name}-${Date.now()}`,
          preview:
            file.preview ||
            `${import.meta.env.VITE_SERVER_URL}/public/uploads/${file.name}`,
        } as FileWithPreview)
    );

    setUploadedFiles((prevFiles) => [
      ...prevFiles.filter((file) => !files.some((f) => f.id === file.id)),
      ...initialFiles,
    ]);
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles?.map(
        (file) =>
          Object.assign(file, {
            id: `${file.name}-${file.lastModified}-${Date.now()}`,
            preview: URL.createObjectURL(file),
          }) as FileWithPreview
      );

      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        return updatedFiles;
      });

      setModifiedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...acceptedFiles];
        return updatedFiles;
      });

      onFilesChange([...uploadedFiles, ...newFiles]);
    },
    [onFilesChange, uploadedFiles]
  );

  const acceptedFiles: Accept = {
    "image/*": [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFiles,
    onDrop,
    multiple: true,
  });

  const removeFile = useCallback(
    (id: string) => {
      const updatedUploadedFiles = uploadedFiles.filter(
        (file) => file.id !== id
      );
      const updatedModifiedFiles = modifiedFiles.filter(
        (file) => file.id !== id
      );

      setUploadedFiles(updatedUploadedFiles);
      setModifiedFiles(updatedModifiedFiles);
      onFilesChange(updatedUploadedFiles);
    },
    [modifiedFiles, onFilesChange, uploadedFiles]
  );

  const thumbs = uploadedFiles?.map((file) => (
    <div style={thumb} key={file.id}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            if (typeof file.preview === "string") {
              URL.revokeObjectURL(file.preview);
            }
          }}
        />
      </div>
      <IconButton
        style={deleteButton}
        onClick={() => removeFile(file.id)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  ));

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (typeof file.preview === "string") {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [uploadedFiles]);

  const handleUploadClick = () => {
    onFilesChange(uploadedFiles);
  };

  return (
    <Container className={styles.container}>
      <p className={styles.title}>
        Перетащите сюда или добавьте фотографии с экскурсии
      </p>
      <div className={styles.content}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} multiple />
          <BsPlusSquareDotted className={styles.bsPlusSquareDotted} />
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <button
          className={styles.deleteButton}
          onClick={handleUploadClick}
          disabled={uploadedFiles.length === 0}
        ></button>
      </div>
    </Container>
  );
}

export default MultipleImageLoader;
