import { ImageProps } from "next/image";
import { FC } from "react";
import Image from "next/image";

const ImageRemote: FC<ImageProps> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
};

export default ImageRemote;
