import { useState, useEffect } from "react";
import ProfileStatusModify from "../../modal/ProfileStatusModify";

const Status = ({age, height, weight, disease, allergy}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
        <div className='flex w-full h-full bg-gray-400 p-5 mb-10 flex-col justify-center overflow-auto'>
          <div>나이: {age}</div>
          <div>키: {height}</div>
          <div>몸무게: {weight}</div>
          <div>질병: {disease}</div>
          <div>알러지: {allergy}</div>
          <button  onClick={() => setOpen(true)} 
          className='flex w-20 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>변경</button>
        </div>
      <ProfileStatusModify open={open} onClose={() => setOpen(!open)} 
      age={age}
      height={height}
      weight={weight}
      disease={disease} 
      allergy={allergy} />
      </>
  )
}

export default Status
