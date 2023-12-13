'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { useCallback } from 'react';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (src: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='aiigbhhb'
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className='
        relative
        cursor-pointer
        hover:opacity-70
        transition
        border-dashed
        border-2
        p-20
        border-neutral-300
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-600
      '
        >
          <TbPhotoPlus size={50} />
          <div className='text-lg font-semibold'>Click to upload</div>
          {value && (
            <div className='absolute inset-0 w-full h-full'>
              <Image
                alt='Uploaded image'
                fill
                src={value}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
