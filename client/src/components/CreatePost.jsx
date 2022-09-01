import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

export default function CreatePost({ post }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      className="hidden w-full bg-slate-900/70 fixed z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full"
      onKeyDown={(e) => {
        if (e.key === "Escape")
          document.getElementById(`create-post`).classList.toggle("hidden");
      }}
      id={`create-post`}
    >
      <AiOutlineClose
        size={22}
        color="white"
        onClick={() =>
          document.getElementById(`create-post`).classList.toggle("hidden")
        }
        className="cursor-pointer absolute right-4 top-4"
      />
      <div className="relative px-4 w-full max-w-[45rem] h-full md:h-auto">
        <div className="relative bg-[#fff] max-w-[45rem] items-center flex flex-col rounded-lg shadow-xl">
          <h4 className="text-lg font-bold text-center w-full py-2 border-b-2 border-slate-200">
            Create new post
          </h4>

          <div className="min-h-[75vh] flex-col items-center justify-center min-w-full">
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section className=" h-[70vh] flex-col flex items-center justify-center">
                  <div
                    className="flex flex-col items-center justify-center w-full my-2 "
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <svg
                      aria-label="Icon to represent media such as images or videos"
                      className="_ab6- mx-auto"
                      color="#262626"
                      fill="#262626"
                      height="77"
                      role="img"
                      viewBox="0 0 97.6 77.3"
                      width="96"
                    >
                      <path
                        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h4 className="text-2xl font-thin text-center">
                      Drag photos and videos here
                    </h4>
                  </div>
                  <div>
                    <input id="input-image" className="hidden" type="file" />
                    <label
                      htmlFor="input-image"
                      className="text-md font-bold text-slate-50 bg-[rgb(0,149,246)] px-4 py-1 rounded-sm"
                    >
                      Select From Computer
                    </label>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </div>
    </div>
  );
}
