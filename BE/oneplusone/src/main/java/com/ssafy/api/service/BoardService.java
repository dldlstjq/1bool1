package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.BoardDto.BoardPostRequest;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {
    Board createBoard(BoardPostRequest boardPostRequest);

    Page<Board> findBoard(Integer page, Integer size);

    boolean modifyBoard(BoardDto.BoardPutRequest boardPutRequest);

    boolean removeBoard(Long id);

    Board findBoardDetail(Long id);

    List<Board> findBySearchBoard(String search);
}
