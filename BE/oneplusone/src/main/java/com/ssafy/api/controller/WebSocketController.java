package com.ssafy.api.controller;

import com.ssafy.api.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@ApiIgnore
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/messages")
    public void chat(@Valid UserDto.Message message) {
        simpMessagingTemplate.convertAndSend("/subscribe/goods/" + message.getGoodsId(), message.getMessage());
    }
}