package com.onepluseone.onepluseone.controller;

import java.util.List;

import com.onepluseone.onepluseone.common.message.Message;
import com.onepluseone.onepluseone.model.board.BoardDto;
import com.onepluseone.onepluseone.service.BoardService;

import org.apache.ibatis.javassist.bytecode.ExceptionTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/board")
@Api(tags = "board")
public class BoardController {
  
  @Autowired
  private BoardService boardService;

  @GetMapping()
  public ResponseEntity<Message> BaordFind() throws Exception{
    HttpStatus status = HttpStatus.OK;
    List<BoardDto> list = boardService.findBoard();
    Message msg = new Message();
    msg.setData(list);
    msg.setSuccess(true);
    msg.setMessage("보드");
    return new ResponseEntity<Message> (msg,status);
  }

  @PostMapping()
  public ResponseEntity<Message> BoardCreate(@RequestBody BoardDto boardDto) throws Exception {
    HttpStatus status = HttpStatus.OK;
    Message msg = new Message();
    if(boardService.createBoard(boardDto)){
      msg.setSuccess(true);
      msg.setMessage("성공");
      
      return new ResponseEntity<Message>(msg,status);
    }
    msg.setSuccess(false);
    msg.setMessage("실패");
    
    return new ResponseEntity<Message>(msg,status);
  }

  // @PutMapping("{id}")
  // public ResponseEntity<Message> BoardModify(@RequestParam("password")int password) throws Exception{

  // }
}
