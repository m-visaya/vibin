import CardTop50Tracks from "./CardTop50Tracks";
import { useState, useEffect } from "react";

function ModalTop50({ handleClose, data }) {
  return (
    <div className="w-screen h-screen bg-stone-900 fixed flex justify-center items-center content-center bg-opacity-95 z-50">
      <div className="w-full h-full rounded-xl opacity-100 flex flex-col items-center p-5 relative">
        <p
          className="absolute top-0 right-0 text-gray-200 mx-8 my-4 text-2xl hover:text-white cursor-pointer"
          onClick={handleClose}
        >
          {" "}
          x{" "}
        </p>
        <h4 className="bg-green-500 text-gray-200 px-3 rounded-md mb-2">
          {" "}
          All Time{" "}
        </h4>
        <h2 className="text-gray-200 text-5xl font-bold uppercase">
          {" "}
          Top 50 <span className="text-green-500">Tracks</span>{" "}
        </h2>
        <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-6 w-full px-8 lg:gap-x-32 overflow-y-auto max-w-5xl">
          {data &&
            data.items.map((item, index) => {
              return (
                <CardTop50Tracks
                  rank={index + 1}
                  title={item.name}
                  artists={item.artists}
                  key={index}
                  cover={item.album.images[0].url}
                ></CardTop50Tracks>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ModalTop50;
