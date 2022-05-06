/* eslint-disable no-unused-vars */
function Comment(props) {
  const { content, nickname, password, id, boardId } = props;
  return (
    <div className="p-1 border border-stone-300">
      <div className="flex justify-between">
        <div>
          <i className="icon-box icon-etc icon-user w-9 h-9"></i>{" "}
          <span className="relative bottom-3">[GM]루아</span>
        </div>

        <div>
          <button className="w-16 h-8  bd-df">
            <i className="icon-box icon-info icon-up w-5 h-5"></i> 0
          </button>
          <button className="w-16 h-8 ml-2 bd-df">
            <i className="icon-box icon-info icon-down w-5 h-5"></i> 0
          </button>
        </div>
      </div>
      <div id="comment-content">
        달려라~
        우헹ㄶ메야훈메ㅑ웨ㅑㅇfsdfajsdflksajdflsakjdfㄴㅁ아ㅣ럼니ㅏㅇ런미ㅏㅇ런미ㅏㄹㅎ
      </div>
      <div id="comment-date" className="text-slate-500">
        2022-05-02 11:39
      </div>
    </div>
  );
}

export default Comment;
