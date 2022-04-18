package com.onepluseone.onepluseone.mapper;

import java.sql.SQLException;
import java.util.List;

import com.onepluseone.onepluseone.model.board.BoardDto;

import org.apache.ibatis.annotations.Mapper;
//import org.mapstruct.Mapper;

@Mapper
public interface BoardMapper {
  public List<BoardDto> selectBoard() throws SQLException;

  public boolean insertBoard(BoardDto boardDto) throws SQLException;
}
