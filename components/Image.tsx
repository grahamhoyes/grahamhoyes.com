import NextImage, { ImageProps } from "next/future/image";

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />;

export default Image;
