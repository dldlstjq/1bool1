package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.BoardDto.BoardPostRequest;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Board;

import java.util.List;

public interface BoardService {
    Board createBoard(BoardPostRequest boardPostRequest);

    List<Board> findBoard();

    boolean modifyBoard(BoardDto.BoardPutRequest boardPutRequest);

    boolean removeBoard(Long id);

    Board findBoardDetail(Long id);

    List<Board> findBySearchBoard(String search);
}
