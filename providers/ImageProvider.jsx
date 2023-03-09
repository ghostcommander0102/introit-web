import React from "react";
import Image from "next/image";

export default function ImageProvider({
  alt,
  height = null,
  width = null,
  className,
  layout,
  unoptimized,
  priority,
  src,
  objectFit,
}) {
  return (
    <>
      <Image
        objectFit={objectFit}
        src={src}
        alt={alt}
        blurDataURL="/images/image-placeholder.png"
        layout={layout}
        {...(layout != "fill" ? { height, width } : {})}
        className={className}
        unoptimized={unoptimized}
        priority={priority}
      />
    </>
  );
}
