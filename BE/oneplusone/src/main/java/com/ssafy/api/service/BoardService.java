package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto.BoardPostRequest;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Board;

public interface BoardService {
    Board createBoard(BoardPostRequest boardPostRequest);
}
