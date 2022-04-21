package com.ssafy.api.controller;

import com.ssafy.api.service.BoardService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(value = "좋아요 API", tags = {"like"})
@RestController
@RequestMapping("/api/v1/like")
public class LikeController {

    @Autowired
    BoardService boardService;

}
