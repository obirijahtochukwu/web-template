import { useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "../../utils/classNames";

import {
  faColumns,
  faMinusSquare,
  faHeading,
  faFont,
  faGripLines,
  faImages,
  faCubes,
  faImage,
  faShareAltSquare,
  faUpload,
  faFileVideo,
  faPhotoVideo,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../reducers";
import { Input, Spin } from "antd";
import { deepClone } from "../../utils/helpers";

import fetchPhotos from "../../utils/pexels";
import useTranslation from "../../translation";
import useDataSource from "../../configs/useDataSource";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { api_url } from "../../../../lib/utils";
import VideosElement from "./videos";
import { Icons } from "./../../../ui/icons";
import DeleteHover from "../../../ui/delete-hover";

const LeftSideBar = (props) => {
  const { clearStyles } = props;
  const { setCurrentItem, setIsDragStart, blockList, setActionType } =
    useContext(GlobalContext);
  const [currentSideBarKey, setCurrentSideBarKey] = useState("blocks");
  const { t } = useTranslation();
  const { blockConfigsList } = useDataSource();
  const sidebarTabsList = [
    {
      name: t("blocks"),
      icon: faCubes,
      key: "blocks",
    },
    {
      name: t("photos"),
      icon: faImages,
      key: "photos",
    },
    {
      name: t("videos"),
      icon: faVideo,
      key: "videos",
    },
  ];
  const [photos, setPhotos] = useState({
    list: null,
    pagination: 1,
    query: "",
    isLoading: true,
    scrollLoading: false,
  });

  const icons = {
    column: faColumns,
    text: faFont,
    heading: faHeading,
    button: faMinusSquare,
    divider: faGripLines,
    image: faImage,
    social_link: faShareAltSquare,
  };

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

  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState({ state: false, value: 0 });

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      setLoading({ state: true, value: imgs.length + 1 });
      formData.append(`image`, acceptedFiles[0]);
      axios
        .post(api_url + "upload_image/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImgs([...imgs, res.data]);
          localStorage.setItem("imgs", JSON.stringify([...imgs, res.data]));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    const _imgs = JSON.parse(localStorage.getItem("imgs")) || [];
    if (_imgs.length > 0) {
      setImgs(_imgs);
    }
  }, []);

  useEffect(() => {
    if (loading.value == imgs.length) {
      setLoading({ state: false, value: 0 });
    }
  }, [loading.state, imgs]);

  const blocksElement = () => {
    return (
      <motion.div
        className="side-bar-blocks"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        key="blocks"
      >
        <div className="side-bar-blocks-container">
          {blockConfigsList.map((item, idx) => {
            return (
              <div
                className="side-bar-blocks-item"
                data-block_type="header"
                draggable="true"
                key={item.key}
                onDragEnd={dragEnd}
                onDragStart={dragStart(item)}
                onClick={() =>
                  idx == 5 || idx == 6
                    ? setCurrentSideBarKey(
                        idx == 5 ? "photos" : idx == 6 ? "videos" : ""
                      )
                    : null
                }
              >
                <div className="sidebar-block">
                  <FontAwesomeIcon
                    icon={idx == 6 ? faVideo : icons[item.key]}
                    className="sidebar-block-icon"
                  />
                  <div className="sidebar-block-text">
                    {idx == 5 ? "Image" : item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const imageBlock = blockConfigsList.find(({ key }) => key === "image");

  const photosElement = () => {
    const numOfImg = imgs.length / 2;

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
          <div className="photos-container overflow-auto !max-h-[calc(100%-150px)] default-scrollbar">
            {console.log(imgs)}
            {!loading.state
              ? imgs?.map(({ image_url }, index) => (
                  <motion.div
                    initial={{ y: -index * 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    key={index}
                    draggable
                    onDragEnd={dragEnd}
                    onDragStart={dragStart({
                      ...imageBlock,
                      src: image_url,
                      alt: image_url,
                    })}
                    className="photo-item max-h-20 rounded-md border border-dashed border-primary/50 relative overflow-hidden group"
                  >
                    <img
                      src={image_url}
                      alt={image_url}
                      className="width-full"
                    />
                    <DeleteHover />
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
          {photos.scrollLoading && (
            <div className="scroll-loading-context">{t("loading")}</div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="side-bar">
      <div className="side-bar-tabs">
        {sidebarTabsList.map((item) => {
          const { key, icon, name } = item;
          return (
            <div
              onClick={() => {
                if (key !== currentSideBarKey) {
                  setCurrentSideBarKey(key);
                  setPhotos({
                    list: null,
                    pagination: 1,
                    isLoading: true,
                    scrollLoading: false,
                    query: "",
                  });
                }
              }}
              className={classNames(
                currentSideBarKey === key
                  ? "side-bar-tab-item-active"
                  : "side-bar-tab-item",
                "side-bar-item-default"
              )}
              key={key}
            >
              <FontAwesomeIcon icon={icon} className="text-18" />
              <div className="side-bar-icon-title">{name}</div>
            </div>
          );
        })}
      </div>
      <div className="side-bar-content">
        <AnimatePresence mode="wait">
          {currentSideBarKey === "blocks" && blocksElement()}
          {currentSideBarKey == "photos" && photosElement()}
          {currentSideBarKey == "videos" && (
            <VideosElement clearStyles={clearStyles} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeftSideBar;
