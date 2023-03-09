import React from "react";
import { Button, Popconfirm } from "antd";
import Styles from "/styles/scss/dashboard/SocialItem.module.scss";
import Pen from "/public/assets/images/svgs/pen-social.svg";
import PenDark from "/public/assets/images/svgs/dark/pen-social.svg";
import Trash from "/public/assets/images/svgs/trash-icon.svg";
import TrashDark from "/public/assets/images/svgs/dark/trash-icon.svg";
import ImageProvider from "providers/ImageProvider";
export default function SocialItem({
  theme,
  data,
  handleDeleteSocial,
  handleShowSocial,
  translator,
}) {
  return (
    <div
      className={`item-social mb-1.5 ${
        theme ? Styles.lightWrapper : Styles.darkWrapper
      }`}
    >
      <div className="md:flex hidden items-center h-full px-4">
        <div className="w-1/2 flex items-center">
          <div className={Styles.avatar}>
            <ImageProvider
              width={20}
              height={20}
              src={data?.icon || "/images/avatar_placeholder.png"}
            />
          </div>
          <div className="pl-2">
            <span className={theme ? Styles.lightText : Styles.darkText}>
              {data?.title}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center w-1/2">
          <div>
            <div>
              <span className={theme ? Styles.lightWeb : Styles.darkWeb}>
                {data?.website}
              </span>
            </div>
          </div>
          <div className="flex">
            <div>
              <Button onClick={handleShowSocial} className={Styles.button}>
                {theme ? <Pen /> : <PenDark />}
              </Button>
            </div>
            <div>
              <Popconfirm
                title={translator["are-you-sure-to-delete-this-social"]?.title}
                okText={translator["yes"]?.title}
                cancelText={translator["no"]?.title}
                onCancel={() => {}}
                onConfirm={handleDeleteSocial}
              >
                <Button className={Styles.button}>
                  {theme ? <Trash /> : <TrashDark />}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center h-full px-4">
        <div className="w-1/2 flex items-center">
          <div className={Styles.avatar}>
            <ImageProvider
              width={20}
              height={20}
              src={data?.icon || "/images/avatar_placeholder.png"}
            />
          </div>
          <div className="pl-2">
            <div>
              <span className={theme ? Styles.lightText : Styles.darkText}>
                {data?.title}
              </span>
            </div>
            <div>
              <div className="">
                <span className={theme ? Styles.lightWeb : Styles.darkWeb}>
                  {data?.website}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-1/2">
          <div>
            <Button onClick={handleShowSocial} className={Styles.button}>
              {theme ? <Pen /> : <PenDark />}
            </Button>
          </div>
          <div>
            <Popconfirm
              title={translator["are-you-sure-to-delete-this-social"]?.title}
              okText={translator["yes"]?.title}
              cancelText={translator["no"]?.title}
              onCancel={() => {}}
              onConfirm={handleDeleteSocial}
            >
              <Button className={Styles.button}>
                {theme ? <Trash /> : <TrashDark />}
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
}
