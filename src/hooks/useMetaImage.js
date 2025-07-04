import {useEffect} from "react";

export default function useMetaImage(imageUrl) {
  useEffect(() => {
    if (imageUrl) {
      const metaImage = document.querySelector("meta[property='og:image']");
      if (metaImage) {
        metaImage.setAttribute("content", imageUrl);
      } else {
        const newMetaImage = document.createElement("meta");
        newMetaImage.setAttribute("property", "og:image");
        newMetaImage.setAttribute("content", imageUrl);
        document.head.appendChild(newMetaImage);
      }
    }
  }, [imageUrl]);
}