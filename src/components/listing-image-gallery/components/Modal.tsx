"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import { getNewParam } from "../ListingImageGallery";
import SharedModal from "./SharedModal";
import { Route } from "next";
import type { MediaMultiple } from "@/interfaces/Strapi";

export default function Modal({
  imageId,
  images,
  onClose,
}: {
  images: MediaMultiple;
  imageId?: string;
  onClose?: () => void;
}) {
  let overlayRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const thisPathname = usePathname();
  const photoId = searchParams?.get("photoId");
  let index = Number(photoId);

  // const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    onClose && onClose();
  }

  // function changePhotoId(newVal: string) {
  //   if (newVal > index) {
  //     setDirection(1);
  //   } else {
  //     setDirection(-1);
  //   }
  //   setCurIndex(newVal);
  //   // router.push(`${thisPathname}/?${getNewParam({ value: newVal })}` as Route);
  // }

  // useKeypress("ArrowRight", () => {
  //   if (index + 1 < images.length) {
  //     changePhotoId(index + 1);
  //   }
  // });

  // useKeypress("ArrowLeft", () => {
  //   if (index > 0) {
  //     changePhotoId(index - 1);
  //   }
  // });

  return (
    <>
      <Dialog
        static
        open={true}
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center "
      >
        <Dialog.Overlay
          ref={overlayRef}
          as={motion.div}
          key="backdrop"
          className="fixed inset-0 z-30 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <SharedModal
          imageId={imageId}
          direction={1}
          images={images}
          // changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
        />
      </Dialog>
    </>
  );
}
