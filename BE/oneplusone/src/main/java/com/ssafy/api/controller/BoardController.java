package com.ssafy.api.controller;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.BoardLikeService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.BoardLikeManagement;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(value = "게시물 API", tags = {"Board"})
@RestController
@RequestMapping("/api/v1/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @Autowired
    BoardLikeService boardlikeService;

    @PostMapping()
    @ApiOperation(value = "글 등록", notes = "<strong>필수 값을 받아서 글을 등록한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="글 정보", required = true) @Valid BoardDto.BoardPostRequest boardPostRequest) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        Board board = boardService.createBoard(boardPostRequest);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping()
    @ApiOperation(value = "전체 글 조회", notes = "<strong>글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBoard() {
        List<Board> board = boardService.findBoard();
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", board));
    }

    @GetMapping("/search")
    @ApiOperation(value = "검색 글 조회", notes = "<strong>검색된 글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBySearchBoard(@RequestParam("search") String search) {
        List<Board> board = boardService.findBySearchBoard(search);
        if(board != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", board));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail", board));
        }
    }

    @GetMapping("{id}")
    @ApiOperation(value = "게시글 상세 조회", notes = "<strong>게시글의 정보를 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBoardDetail(@PathVariable("id") Long id) {
        Board board = boardService.findBoardDetail(id);
        if(board != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", board));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail", board));
        }
    }


    @PutMapping()
    @ApiOperation(value = "해당 글 수정", notes = "<strong>글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyBoard(@RequestBody BoardDto.BoardPutRequest boardPutRequest) {
        if(boardService.modifyBoard(boardPutRequest)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @DeleteMapping("{id}")
    @ApiOperation(value = "해당 글 삭제", notes = "<strong>해당 글을 삭제한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyBoard(@PathVariable("id") Long id) {
        if(boardService.removeBoard(id)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @GetMapping("/like/{boardId}")
    @ApiOperation(value = "해당 게시글의 좋아요 갯수를 리턴함", notes = "<strong>게시글의 좋아요 갯수를 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByBoard(@PathVariable("boardId") Long id) {
        BoardDto.BoardLikeGetRequest dto = new BoardDto.BoardLikeGetRequest();
        dto.setId(id);
        Long board = boardlikeService.findByBoardId(dto);
        if(board != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", board));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @GetMapping("/like")
    @ApiOperation(value = "좋아요 순 정렬", notes = "<strong>좋아요 순 정렬</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByBoardLike() {

        List<BoardDto.BoardLikeGetOrderBy> list = boardlikeService.findByBoard();
        if(list != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @PostMapping("/like/{boardId}")
    @ApiOperation(value = "게시글 좋아요 조회", notes = "<strong>게시글의 좋아요 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByBoard(@PathVariable("boardId") Long boardId, @RequestParam("user_id")Long userId) {
        BoardDto.BoardLikeGetRequest dto = new BoardDto.BoardLikeGetRequest();
        dto.setId(boardId);
        dto.setUserId(userId);

        if(boardlikeService.modifyBoardLike(dto))
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }
}
