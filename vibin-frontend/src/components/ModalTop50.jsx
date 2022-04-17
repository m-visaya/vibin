import CardTop50Tracks from "./CardTop50Tracks";
import { useState, useEffect } from "react";

function ModalTop50(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/top-tracks`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-black fixed flex justify-center items-center content-center py-10 bg-opacity-20 z-50">
      <div className="overflow-y-auto bg-stone-900 w-full h-full lg:mx-32 rounded-xl opacity-100 flex flex-col items-center p-5 relative">
        <p
          className="absolute top-0 right-0 text-gray-200 mx-8 my-4 text-2xl hover:text-white cursor-pointer"
          onClick={props.onClose}
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
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 w-full lg:w-4/6">
          {data &&
            data.items.map((item, index) => {
              return (
                <CardTop50Tracks
                  rank={index + 1}
                  title={item.name}
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

function closeModal(e) {
  console.log(e);
}

function generateCards() {
  let titles = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, rem.",
    "Lorem ipsum",
  ];
  let items = [];
  for (let index = 0; index < 50; index++) {
    items.push();
  }
  return items;
}

export default ModalTop50;
