package com.onepluseone.onepluseone.controller;

import com.onepluseone.onepluseone.common.message.Message;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/test")
@Api(tags = "test")
public class TestController {
  
  @GetMapping()
  public String Test() throws Exception{
    HttpStatus status = HttpStatus.OK;
    // Message msg = new Message();
    // msg.setData("여기가 결과물입니다.");
    // msg.setSuccess(true);
    // msg.setMessage("여긴 내가 보여주고 싶은 메세지");
    // return new ResponseEntity<Message> (msg,status);
    return "HI";
  }
}
