import { useState, useEffect } from "react";
import axios from "axios";
import {request} from "../../utils/request"
import { Modal, Box } from "@mui/material";

const ProfilePasswordModify = ({ open, onClose, email }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [isCurrentPassword, setIsCurrentPassword] = useState(false);
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isConfirmPattern, setIsConfirmPattern] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false)

    const setCurrentPasswordHandler = (e) => {
      setCurrentPassword(e.target.value)
      setIsCurrentPassword(false);
    }


    const onClickSubmitButton = () => {
      if (isConfirmPassword && isConfirmPattern && isCurrentPassword) { // 변경 패스워드 일치시
        if (currentPassword === password)
        return alert("현재 비밀번호에서 변경점이 없습니다.")
        request()
          .post("/found_password/post", { password, email }) // 비밀번호 변경시 입력한 패스워드 백으로 전달, 이메일?
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err))
        alert("변경되었습니다.")
        onClose();
        return window.location.href = "/profile"
      } else { // 불일치
        return alert("정보를 다시 확인해 주세요.")
      }
    }

    const onClickCurrentPasswordCheckButton = () => {
      if (currentPassword) {
        request()
          .post("/profile/currentPassword", { password: currentPassword })
          .then((res) => {
            if (res.data.result) 
            setIsCurrentPassword(true)})
          .catch((err) => {console.error(err); alert(err.response.data.message)});
      } else {
        alert("현재 비밀번호를 입력해주세요.");
      }
    };
  
    useEffect(() => {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      if (password.match(reg)){
        setIsConfirmPattern(true);
      } else
      setIsConfirmPattern(false)
      if (password === passwordConfirm)
        setIsConfirmPassword(true);
      else
        setIsConfirmPassword(false);
    }, [password, passwordConfirm]);

    return (
      <Modal open={open} onClose={onClose}>
      <Box className="absolute flex w-2/6 h-[70%] bg-white rounded-2xl items-center justify-center shadow-shadow mr-20 text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col">
      <label className='flex text-4xl font-bold'>비밀번호 재설정</label>
      <div className="flex w-4/5 justify-center items-center flex-row mt-5">
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] mt-5 px-3' placeholder='현재 비밀번호' type='password' onChange={setCurrentPasswordHandler} />
      <button className="flex w-1/5 h-12 bg-button rounded-r-lg justify-center items-center text-white mt-5 px-3" onClick={() => onClickCurrentPasswordCheckButton()}>
            확인
      </button>
      </div>
      {isCurrentPassword ? (
          <div className="flex w-4/5 justify-end items-center mt-2">
            <label className="flex text-blue-500 text-sm mr-2">비밀번호 확인 완료</label>{" "}
          </div>
        ) :
          <div className="flex w-4/5 justify-end items-center mt-2">
            <label className="flex text-red-500 text-sm mr-2">비밀번호를 확인해주세요.</label>
          </div>
      }
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3' placeholder='비밀번호' type='password' onChange={(e) => setPassword(e.target.value)} />
      {isConfirmPattern ? (
          <label className="flex w-4/5 justify-end text-blue-500 text-sm mt-1">올바른 패턴입니다.</label>
        ) : (
          <label className="flex w-4/5 justify-end text-red-500 text-sm mt-1">패턴이 올바르지 않습니다.</label>
        )}
      <label className='flex w-4/5 justify-end text-gray-500 text-sm mt-1'>8 - 14자 사이 입력 (0-9, a-z, A-Z)</label>
      <label className='flex w-4/5 justify-end text-gray-500 text-sm mb-1'>숫자, 특수 문자 필요 (!, @, #, $, %)</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='비밀번호 확인' type='password' onChange={(e) => setPasswordConfirm(e.target.value)} />
      {isConfirmPassword ? <label className='flex w-4/5 justify-end text-blue-500 text-sm mt-1'>비밀번호가 일치합니다.</label> : <label className='flex w-4/5 justify-end text-red-500 text-sm mt-1'>비밀번호가 일치하지 않습니다.</label>}
      <button className='flex w-32 h-12 bg-button mt-5 justify-center items-center rounded-xl text-white text-md' onClick={() => onClickSubmitButton()}>
        변경
      </button>
    </Box>
    </Modal>
    )
  }
  
  export default ProfilePasswordModify
  