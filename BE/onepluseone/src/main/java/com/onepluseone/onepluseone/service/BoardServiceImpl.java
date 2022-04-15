package com.onepluseone.onepluseone.service;

import java.util.List;

import com.onepluseone.onepluseone.mapper.BoardMapper;
import com.onepluseone.onepluseone.model.board.BoardDto;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService{


  @Autowired
  private SqlSession sqlSession;

  @Override
  public List<BoardDto> findBoard() throws Exception{
    return sqlSession.getMapper(BoardMapper.class).selectBoard();
  }

  @Override
  public boolean createBoard(BoardDto boardDto) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).insertBoard(boardDto);
  }
  
}
