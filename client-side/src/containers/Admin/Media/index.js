"use client";
import { multiPartPost } from "@/utils/Api";
import { Button } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useRef } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import { toast } from "react-toastify";

const MediaManage = () => {
  const dropRef = useRef(null);

  const handleUploadFile = async (files) => {
    const res = await multiPartPost("files/document/upload", {}, files);
    if (res?.data?.success) {
      toast.success(res?.data?.msg || "File upload successfull.");
    } else {
      toast.warning("File upload failure.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>Media Manage</div>
        <Dropzone
          openRef={dropRef}
          activateOnClick={false}
          styles={{ inner: { pointerEvents: "all" } }}
          onDrop={(files) => handleUploadFile(files)}
          style={{
            border: "none",
            padding: "0",
          }}
          accept={["image/png", "image/jpeg", "image/webp", "image/jpg"]}
        >
          <Button
            className="btn bg-secondary px-4 py-2 rounded-lg text-white"
            leftIcon={<RiUploadCloud2Line size={20} />}
            onClick={() => dropRef.current()}
          >
            Upload File
          </Button>
        </Dropzone>
      </div>
    </>
  );
};

export default MediaManage;
