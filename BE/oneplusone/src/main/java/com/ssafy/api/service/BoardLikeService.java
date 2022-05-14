package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.BoardLikeManagement;

import java.util.List;

public interface BoardLikeService {
    Long findByBoardId(BoardDto.BoardLikeGetRequest dto);

    boolean modifyBoardLike(BoardDto.BoardLikeGetRequest dto);

    List<BoardDto.BoardLikeGet> findByBoard();
}
