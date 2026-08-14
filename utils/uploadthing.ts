import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateReactHelpers,
  //   generateUploadButton,
  //   generateUploadDropzone,
} from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
