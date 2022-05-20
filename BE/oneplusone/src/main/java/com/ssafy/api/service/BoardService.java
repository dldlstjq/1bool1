package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.BoardDto.BoardPostRequest;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {
    Board createBoard(BoardPostRequest boardPostRequest);

    Page<BoardDto.BoardLikeGet> findBoard(Integer page, Integer size,Pageable pageable);

    boolean modifyBoard(BoardDto.BoardPutRequest boardPutRequest);

    boolean removeBoard(BoardDto.BoardDeleteRequest dto);

    Board findBoardDetail(Long id);

    List<BoardSearch> findBySearchBoard(String search);
}
