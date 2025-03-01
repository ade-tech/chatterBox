import { useEffect, useState } from "react";

function resizeHandler({
  width,
  height,
  maxWidthScale = 0.8,
  maxHeightScale = 0.7,
}) {
  const maxWidth = window.innerWidth * maxWidthScale;
  const maxHeight = window.innerHeight * maxHeightScale;

  let imageWidth = width;
  let imageHeight = height;

  if (width > maxWidth || height > maxHeight) {
    const scale = Math.min(maxWidth / width, maxHeight / height);
    imageWidth = width * scale;
    imageHeight = height * scale;
  }

  return { width: imageWidth, height: imageHeight };
}

function useSize({
  prevUrl = null,
  preview = null,
  maxWidthScale,
  maxHeightScale,
}) {
  const [prev, setPrev] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!preview && !prevUrl) {
      setPrev(null);
      setDimensions({ width: 0, height: 0 });
      return;
    }

    const objectUrl = preview ? URL.createObjectURL(preview) : prevUrl;
    setPrev(objectUrl);

    const loadMedia = (media) => {
      media.onload = () => {
        const { width, height } = resizeHandler({
          width: media.width || media.videoWidth,
          height: media.height || media.videoHeight,
          maxWidthScale,
          maxHeightScale,
        });
        setDimensions({ width, height });

        if (preview) URL.revokeObjectURL(objectUrl);
      };
    };

    if (
      (preview && preview.type.startsWith("image")) ||
      (prevUrl && prevUrl.match(/\.(jpeg|jpg|png|gif)$/))
    ) {
      const img = new Image();
      img.src = objectUrl;
      loadMedia(img);
    } else if (
      (preview && preview.type.startsWith("video")) ||
      (prevUrl && prevUrl.match(/\.(mp4|webm|mov)$/))
    ) {
      const video = document.createElement("video");
      video.src = objectUrl;
      video.preload = "metadata";
      video.onloadedmetadata = () => loadMedia(video);
    }

    return () => {
      if (preview) URL.revokeObjectURL(objectUrl);
    };
  }, [preview, prevUrl]);

  return {
    containerSize: { width: dimensions.width, height: dimensions.height },
    imageSource: prev,
  };
}

export default useSize;
