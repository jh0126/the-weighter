import axios from "axios";
import { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import {request} from "../../utils/request"

const Recommend = () => {
  const [res, setRes] = useState({ 
    flag:0,
    gender:"profileData.gender", 
    age:"", 
    height:"", 
    weigh:"", 
    activityRate:"",
    diseases:"",
  });
  const [data, setData] = useState("");

  const [profileData, setProfileData] = useState({});
  const [statusData, setStatusData] = useState({});
  
  useEffect(() => {
    request()
        .post("/profile")
        .then((res) => {
          setProfileData(res.data.profile);
          setStatusData(res.data.status);
          console.log("프로필데이터:",profileData);
        })
        .catch((err) => console.error(err));
  }, []); 

  const handleChange = (e) => { // input value값 핸들러
    const { name, value } = e.target;
    setRes(prevState => ({ ...prevState, [name]: value }));
  }

  const handleKeyPress = (e) => {
    // 입력된 키가 숫자가 아니면 입력 방지
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      alert("숫자만 입력하세요.")
    }
  }

  const onClickSubmitButton = () => { // 입력버튼 누르면
    console.log('데이터확인:',res)
    axios.post("/api/chat", { prompt: res }).then((res) => { // prompt 변수에 res값을 담아서 포스트요청(api/chat.ts로)
      console.log("응답 확인:",res.data);
      setData(res.data.response.text.replace(/^\n+/, "")); // chat.ts에서 응답받은 요청값을 data에 셋팅, 줄바꿈 제거
    });
  };

  return (
    <CommonLayout>
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex">
          <div className="mr-2">
            <label className="flex items-center">
              <input type="radio" name="gender" value="남성" onChange={handleChange} checked={profileData.gender == 1} />
              <span className="ml-2">남성</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="radio" name="gender" value="여성" onChange={handleChange} checked={profileData.gender == 0} />
              <span className="ml-2">여성</span>
            </label>
          </div>
        </div>{/*  res에 밸류값 저장 */}
        <input
          type="text"
          name="age"
          placeholder="나이"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="height"
          placeholder="키(cm)"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
          // onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          name="weigh"
          placeholder="체중(kg)"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
          // onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          name="activityRate"
          placeholder="활동량"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
          // onKeyPress = {handleKeyPress}
        />
        <input
          type="text"
          name="diseases"
          placeholder="질환 및 알러지"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
          // onKeyPress = {handleKeyPress}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={onClickSubmitButton}>
          입력
        </button>
      </div>
      <div className="flex w-3/5 min-h-[100px] mt-5 border-black border-2 whitespace-pre-line p-3 rounded-lg overflow-scroll"><label className="flex w-full h-full">{data && data}</label></div>
      {/* {data & data} 3항연산자 왼쪽 값이 참이면 오른쪽 값 표시 */}
    </CommonLayout>
  );
};

export default Recommend;
