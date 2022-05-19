package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.BoardLikeManagement;
import com.ssafy.db.entity.BoardSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardLikeService {
    Long findByBoardId(BoardDto.BoardLikeGetRequest dto);

    boolean modifyBoardLike(BoardDto.BoardLikeGetRequest dto);

    Page<BoardDto.BoardLikeGet> findByBoard(Integer page, Integer size, Pageable pageable);

    boolean findLike(BoardDto.BoardLikeGetRequest dto);

    List<BoardDto.BoardLikeGet> findByBoardWeek();

    List<BoardSearch> findBoardLike(Long userId);
}
