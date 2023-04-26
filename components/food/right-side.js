import { useState } from "react";
import MyCanvas from "../layout/MyCanvas";
import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";

const RightSide = ({ canvasRef, predictions }) => {
  const [detail, setDetail] = useState();

  const onClickDetail = async (image) => {
    const model = await tf.loadLayersModel("my_model_구이/model.json");
    const tensor = tf.browser.fromPixels(image).expandDims();
    const resizedTensor = tf.image.resizeBilinear(tensor, [619, 457]);
    const predictions = model.predict(resizedTensor);
    const softmaxOutput = predictions.softmax().dataSync();

    console.log(softmaxOutput);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full lg:ml-10 lg:items-start lg:w-3/5 change'>
      <div className='flex w-[90%] lg:w-[25%] h-14 dark:bg-gray-600 bg-gray-400 items-center justify-center text-[25px] rounded-lg mb-5 whitespace-nowrap select-none'>분석 결과</div>
      <div className='flex flex-col w-[90%] h-[60vh] lg:h-4/5 dark:bg-gray-700 mb-5 lg:mb-0 bg-gray-200 rounded-lg p-5'>
        <div className='flex flex-row w-full overflow-auto'>
          {predictions &&
            predictions.map((value, index) => {
              const [x, y, width, height] = value.bbox;
              return (
                <MyCanvas
                  key={index}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  image={canvasRef.current}
                  imageWidth={canvasRef.current.width}
                  imageHeight={canvasRef.current.height}
                  onClick={onClickDetail}
                />
              );
            })}
        </div>
        <div className='flex items-center justify-center h-full'>{detail && detail.score}</div>
      </div>
    </div>
  );
};

export default RightSide;
