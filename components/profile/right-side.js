import { useState, useEffect } from "react";
import Status from "./right-sides/Status"
import NutritionStat from "./right-sides/NutritionStat"
import ExerciseStat from "./right-sides/ExerciseStat"

const RightSide = ({age, height, weight, disease, allergy}) => {
  const [show, setShow] = useState("status");


  return (
    <div className='flex w-full lg:w-3/5 h-[95%] bg-white rounded-2xl items-center justify-center shadow-shadow text-black font-bold overflow-auto'>
      <div className="flex w-[10%] h-full flex-col justify-start">
        <button className={`flex w-full h-1/3 text-xl p-5 flex-col hover:bg-hover hover:transition ${show === "status" ? "bg-gray-400" : "bg-gray-200"}`}
        onClick={(e) => setShow("status")}>신체 정보</button>
        <button className={`flex w-full h-1/3 text-xl p-5 flex-col hover:bg-hover hover:transition ${show === "nutrition" ? "bg-gray-400" : "bg-gray-200"}`}
        onClick={(e) => setShow("nutrition")}>영양 기록</button>
        <button className={`flex w-full h-1/3 text-xl p-5 flex-co  hover:bg-hover hover:transition ${show === "exercise" ? "bg-gray-400" : "bg-gray-200"}`}
        onClick={(e) => setShow("exercise")}>운동 기록</button>
        </div>
      <div className='flex w-[95%] h-full flex-col items-center justify-center'>
        {show === "status" && (
          <Status
            age={age}
            height={height}
            weight={weight}
            disease={disease}
            allergy={allergy}
          />
        )}
        {show === "nutrition" && (
          <NutritionStat/>
        )}
        {show === "exercise" && (
          <ExerciseStat/>
        )}
      </div>
    </div>
  )
}

export default RightSide
