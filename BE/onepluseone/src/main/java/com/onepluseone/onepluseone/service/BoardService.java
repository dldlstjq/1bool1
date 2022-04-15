package com.onepluseone.onepluseone.service;

import java.util.List;

import com.onepluseone.onepluseone.model.board.BoardDto;

import org.springframework.stereotype.Service;

@Service
public interface BoardService {

  public List<BoardDto> findBoard() throws Exception;
  
}
