// @ts-ignore
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

function ImageLoader({ onFileUpload }) {
  const [uploadStatus, setUploadStatus] = useState("");
  const [file, setFile] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]); // Store the first file
        setUploadStatus("Фото успешно загружено!");
        setIsActive(false);
        onFileUpload(acceptedFiles[0]); // Notify parent component
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: !isActive,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const handleCancel = () => {
    setFile(null);
    setUploadStatus("");
    setIsActive(true);
    onFileUpload(null); // Notify parent component
  };

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      style={{
        position: "relative",
        border: "2px dashed orange",
        borderRadius: "8px",
        padding: "5px 0",
        textAlign: "center",
        cursor: isActive ? "pointer" : "default",
        backgroundColor: isDragActive ? "#e6f7ff" : "#f9f9f9",
      }}
    >
      <input {...getInputProps()} />
      {uploadStatus ? (
        <div>
          <p style={{ color: "green" }}>{uploadStatus}</p>
          <IconButton
            onClick={handleCancel}
            style={{
              position: "absolute",
              top: "-3px",
              right: "2px",
              color: "red",
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
      ) : (
        isActive && (
          <>
            {isDragActive ? (
              <p>Загрузите фото профиля</p>
            ) : (
              <p>Загрузите фото профиля</p>
            )}
          </>
        )
      )}
    </div>
  );
}

export default ImageLoader;
