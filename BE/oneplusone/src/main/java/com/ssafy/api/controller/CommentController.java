package com.ssafy.api.controller;

import com.ssafy.api.dto.CommentDto;
import com.ssafy.api.dto.GoodsReviewDto;
import com.ssafy.api.service.CommentService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.GoodsReview;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "댓글 API", tags = {"Comment"})
@RestController
@RequestMapping("/v1/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("{boardId}")
    @ApiOperation(value = "전체 댓글 조회", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findComment(@PathVariable("boardId")Long boardId) {
        List<Comment> comment = commentService.findComment(boardId);
        List<CommentDto.CommentGetRequest> list = new ArrayList<>();
        CommentDto.CommentGetRequest ans;
        for(int i = 0; i < comment.size(); i++){
            ans = new CommentDto.CommentGetRequest();
            ans.setBoardId(comment.get(i).getBoard().getId());
            ans.setContent(comment.get(i).getContent());
            ans.setNickname(comment.get(i).getNickname());
            ans.setId(comment.get(i).getId());
            ans.setPassword(comment.get(i).getPassword());
            list.add(ans);
        }
        if(list.size() > 0) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "댓글이 없습니다.", list));
        }
    }

    @PostMapping("{boardId}")
    @ApiOperation(value = "댓글 등록", notes = "<strong>댓글 등록</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerComment(@RequestBody CommentDto.CommentPostRequest commentPostRequest) {
        if(commentService.createComment(commentPostRequest) != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

    @PutMapping("{boardId}")
    @ApiOperation(value = "댓글 수정", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyComment(@PathVariable("boardId")Long boardId, @RequestBody CommentDto.CommentPutRequest dto) {
        dto.setBoardId(boardId);
        if(commentService.modifyComment(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

    @DeleteMapping("{boardId}")
    @ApiOperation(value = "댓글 삭제", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> removeComment(@PathVariable("boardId")Long boardId, @RequestParam("id") Long id, @RequestParam("password")String pw) {
        CommentDto.CommentDeleteRequest dto = new CommentDto.CommentDeleteRequest();
        dto.setBoardId(boardId);
        dto.setPassword(pw);
        dto.setId(id);
        if(commentService.removeComment(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

}
