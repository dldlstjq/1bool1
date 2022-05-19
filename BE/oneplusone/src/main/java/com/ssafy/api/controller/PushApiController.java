package com.ssafy.api.controller;

import com.ssafy.api.service.PushNotificationService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.BaseEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Slf4j
@RequestMapping("/v1/push")
@ApiIgnore
public class PushApiController {
    @Autowired
    private PushNotificationService pushNotificationService;

    @PostMapping("/fcm")
    public ResponseEntity<? extends BaseResponseBody> reqFcm(
            @RequestParam(required = true) String title,
            @RequestParam(required = true) String body
    ) {

        log.info("** title : {}",title);
        log.info("** body : {}",body);

        try {
            pushNotificationService.sendCommonMessage(title, body);
        } catch(Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "알람 에러"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "성공"));
    }

}