import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { api_url } from "../../../../lib/utils";
import { GlobalContext } from "../../reducers";
import { deepClone } from "../../utils/helpers";
import useDataSource from "../../configs/useDataSource";

export default function VideosElement({ clearStyles }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState({ state: false, value: 0 });
  const { blockConfigsList } = useDataSource();

  // const { clearStyles } = props;
  const { setCurrentItem, setIsDragStart, blockList, setActionType } =
    useContext(GlobalContext);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      setLoading({ state: true, value: videos.length + 1 });
      formData.append(`video`, acceptedFiles[0]);
      axios
        .post(api_url + "upload_video/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setVideos([...videos, res.data]);
          localStorage.setItem("videos", JSON.stringify([...videos, res.data]));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const imageBlock = blockConfigsList.find(({ key }) => key === "video");

  const dragEnd = (event) => {
    event.target.style.border = "";
    event.target.children[0] &&
      event.target.children[0].classList.remove("sidebar-block-move");
    setTimeout(() => {
      setIsDragStart(false);
      clearStyles();
    }, 50);
  };

  const dragStart = (item) => (event) => {
    setCurrentItem({
      data: deepClone(item),
      type: "add",
      index: blockList.length + 1,
    });
    setIsDragStart(true);
    event.target.style.border = "1px dashed #ccc";
    event.target.children[0] &&
      event.target.children[0].classList.add("sidebar-block-move");
    setActionType("add");
  };

  useEffect(() => {
    const _videos = JSON.parse(localStorage.getItem("videos")) || [];
    if (_videos.length > 0) {
      setVideos(_videos);
    }
  }, []);

  useEffect(() => {
    if (loading.value == videos.length) {
      setLoading({ state: false, value: 0 });
    }
  }, [loading.state, videos]);

  return (
    <motion.div className="photo-container">
      <div
        className=" w-full h-fit py-10 mb-5 border-2 border-gray-300 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50"
        {...getRootProps()}
      >
        <FontAwesomeIcon
          icon={faUpload}
          className=" text-4xl text-gray-500 w-14 h-14"
        />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <div className="photos-body">
        <div className="overflow-auto grid grid-cols-2 gap-3 !h-[calc(100%-150px)] default-scrollbar">
          {!loading.state
            ? videos?.map(({ video_url }, index) => (
                <motion.div
                  initial={{ y: -index * 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  key={index}
                  draggable
                  onDragEnd={dragEnd}
                  onDragStart={dragStart({
                    ...imageBlock,
                    src: video_url,
                    alt: video_url,
                  })}
                  className="photo-item bg-black h-fit"
                >
                  <video controls="controls" preload="none">
                    <source
                      src={video_url}
                      type="video/mp4"
                      style={{ background: "blue" }}
                      className="width-full"
                    />
                  </video>
                </motion.div>
              ))
            : Array(6)
                .fill("")
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="skeleton h-full w-full mx-2 truncate bg-skeleton text-base font-medium text-muted-foreground"
                  ></div>
                ))}
        </div>
      </div>
    </motion.div>
  );
}
