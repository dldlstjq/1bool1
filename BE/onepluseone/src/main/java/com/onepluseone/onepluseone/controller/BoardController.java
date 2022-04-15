package com.onepluseone.onepluseone.controller;

import java.util.List;

import com.onepluseone.onepluseone.common.message.Message;
import com.onepluseone.onepluseone.model.board.BoardDto;
import com.onepluseone.onepluseone.service.BoardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/board")
@Api(tags = "board")
public class BoardController {
  
  @Autowired
  private BoardService boardService;

  @GetMapping()
  public ResponseEntity<Message> findBoard() throws Exception{
    HttpStatus status = HttpStatus.OK;
    List<BoardDto> list = boardService.findBoard();
    Message msg = new Message();
    msg.setData(list);
    msg.setSuccess(true);
    msg.setMessage("보드");
    return new ResponseEntity<Message> (msg,status);
  }
}
