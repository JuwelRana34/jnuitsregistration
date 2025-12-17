import { Image, ImageKitProvider } from '@imagekit/next';
import React from 'react';

interface Props {
  image:string
}

export default function ImagekitImageShow(props: Props) {
  return (
    <ImageKitProvider urlEndpoint={`${ process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT }`}>
      <Image
        src={props.image}
        width={140}
        height={140}
        alt="Picture of the user"
        className="w-28 h-28 md:w-32 md:h-32 rounded-md object-center object-cover border-4 border-green-100 shadow-sm"
      />
    </ImageKitProvider>
  );
}