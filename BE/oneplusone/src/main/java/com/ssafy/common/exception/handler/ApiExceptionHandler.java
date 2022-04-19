package com.ssafy.common.exception.handler;


/*
 *
 * 회원가입 유효성 체크 위한 ControllerAdvice.
 * 유효성에 적합하지 않는다면 그에 맞는 에러메시지 반환
 *
 */

import com.ssafy.common.model.response.BaseResponseBody;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ApiExceptionHandler {

    /* 유효성 검사 예외처리 핸들러 */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

        String errorMessage = ex.getBindingResult()
                .getAllErrors()
                .get(0)
                .getDefaultMessage();

        return ResponseEntity.status(200).body(BaseResponseBody.of(401, errorMessage));
    }

}
