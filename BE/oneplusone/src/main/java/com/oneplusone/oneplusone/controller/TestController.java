package com.oneplusone.oneplusone.controller;

import com.oneplusone.oneplusone.common.message.Message;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/test")
public class TestController {
  
  @GetMapping()
  public ResponseEntity<Message> Test() throws Exception{
    HttpStatus status = HttpStatus.OK;
    Message message = new Message();
		message.setSuccess(true);
    message.setData("TEST OK!");
    message.setMessage("테스트 성공입니다. 이 문자열 잘 보이시죠?");
		return new ResponseEntity<Message>(message, status);
  }
}
