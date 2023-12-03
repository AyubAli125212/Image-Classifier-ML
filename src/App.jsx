import React from "react";
import ImageUploader from "./components/ImageUploader";
import brush from "./assets/brush.png";

const App = () => {
  const pStyle = {
    backgroundImage: `url(${brush})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  };

  return (
    <div className="container h-screen mx-auto overflow-hidden relative">
      <p
        className="text-4xl text-slate-800 text-center font-extrabold mt-10 font-sans p-8"
        style={pStyle}
      >
        Image Classification
      </p>
      <ImageUploader />
      <div className="absolute w-full  bottom-10  flex justify-center">
        <p className="bg-slate-300 text-slate-800 font-sans font-medium  max-sm:text-sm px-4 py-1 rounded-md text-g">Made with  ˗ˋˏ 🖤 ˎˊ˗  by  <span className="hover:text-blue-600 duration-300"> <a href="https://www.linkedin.com/in/ayub-ali-seid/" target="_blank">Ayub Ali</a> </span></p>
      </div>
    </div>
  );
};

export default App;
