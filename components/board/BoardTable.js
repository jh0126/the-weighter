import moment from "moment";
import { Pagination } from "@mui/material";

const BoardTable = ({ data, onClickTitle, count, handlePage }) => {
  return (
    <div className='flex flex-col items-center justify-start w-[80%] h-4/5'>
      <div className='flex items-center justify-center w-full text-black select-none bg-neutral-300 border-neutral-400 border-y-2'>
        <div className='flex w-[5%] h-12 justify-center items-center border-neutral-400 border-r'>번호</div>
        <div className='flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r'>카테고리</div>
        <div className='flex w-[50%] h-12 justify-center items-center border-neutral-400 border-r'>제목</div>
        <div className='flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r'>작성자</div>
        <div className='flex w-[15%] h-12 justify-center items-center border-neutral-400 border-r'>작성일</div>
        <div className='flex w-[10%] h-12 justify-center items-center '>조회수</div>
      </div>
      {data &&
        data.map((value) => {
          return (
            <div className='flex items-center justify-center w-full text-black bg-white border-b-2 border-neutral-400' key={value.id}>
              <div className='flex w-[5%] h-12 justify-center items-center border-neutral-400 border-r'>{value.id}</div>
              <div className='flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r'>
                {value.category === "default" ? "기본" : value.category === "community" ? "커뮤니티" : "qna"}
              </div>
              <div className='flex w-[50%] h-12 justify-center items-center border-neutral-400 border-r cursor-pointer' onClick={() => onClickTitle(value.id)}>
                {value.title}
              </div>
              <div className='flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r'>{value.user_name}</div>
              <div className='flex w-[15%] h-12 justify-center items-center  border-neutral-400 border-r'>{moment(value.createdAt).format("YYYY-MM-DD")}</div>
              <div className='flex w-[10%] h-12 justify-center items-center'>{value.hit}</div>
            </div>
          );
        })}
      <div className='flex items-center justify-center w-full bg-white border-b-2 h-14 border-neutral-400'>
        <Pagination count={parseInt(count / 10) + 1} defaultPage={1} boundaryCount={2} onChange={(e) => handlePage(e)} />
      </div>
    </div>
  );
};

export default BoardTable;
