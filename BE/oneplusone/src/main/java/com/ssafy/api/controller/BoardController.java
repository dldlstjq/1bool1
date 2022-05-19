package com.ssafy.api.controller;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.GoodsDto;
import com.ssafy.api.dto.RecipeDto;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.FireBaseService;
import com.ssafy.api.service.BoardLikeService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Api(value = "게시물 API", tags = {"Board"})
@RestController
@CrossOrigin("*")
@RequestMapping("/v1/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @Autowired
    FireBaseService fireBaseService;
    @Autowired
    BoardLikeService boardlikeService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "글 등록", notes = "프론트 분들에겐 죄송하지만 파일 등록은 무조건 스웨거가 아닌 <strong>POSTMAN</strong>으로 하셔야 합니다! 테스트 하시기 전에 한 번 불러주세요!")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="글 정보", required = true) @ModelAttribute BoardDto.BoardPostRealRequest boardPostRealRequest) {
        List<MultipartFile> files = boardPostRealRequest.getFile();
        List<String> ans = new ArrayList<>();
        if(CollectionUtils.isEmpty(files)){

        }
        else {
            for (MultipartFile one : files) {
                ans.add(fireBaseService.upload(one));
            }
        }

        String photo = "";

        if(ans != null && !ans.isEmpty() && ans.size() > 0) {
            for (int i = 0; i < ans.size(); i++) {
                if(i != (ans.size() - 1) )
                {
                    photo += ans.get(i) + ",";
                }else{
                    photo += ans.get(i);
                }
            }
        }

        photo += "";
        BoardDto.BoardPostRequest boardPostRequest = new BoardDto.BoardPostRequest();
        boardPostRequest.setPhoto(photo);
        boardPostRequest.setNickname(boardPostRealRequest.getNickname());
        boardPostRequest.setContent(boardPostRealRequest.getContent());
        boardPostRequest.setTitle(boardPostRealRequest.getTitle());
        boardPostRequest.setPassword(boardPostRealRequest.getPassword());
        Board board = boardService.createBoard(boardPostRequest);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping()
    @ApiOperation(value = "전체 글 조회", notes = "<strong>글의 목록을 가져온다.</strong> " +
            "<br/> page는 몇 페이지인지를 나타내고 size는 가져올 글의 개수입니다. " +
            "<br/> page는 0부터 시작이고 데이터가 있으면 리스트가, 가져올 데이터가 없으면 게시글이 없다는 메시지기 반환됩니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBoard(@RequestParam("page") Integer page, @RequestParam("size") Integer size,@ApiIgnore Pageable pageable) {
        List<BoardDto.BoardLikeGet> board = boardService.findBoard(page, size,pageable).getContent();
        if(board.isEmpty()) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "해당 페이지에 게시글이 없습니다."));
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
        List<BoardSearch> board = boardService.findBySearchBoard(search);
        if(board.size() > 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", board));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "제목과 내용 모두 찾아 봤지만 존재 하지 않습니다.", board));
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


    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "해당 글 수정", notes = "<strong>POSTMAN 이용 부탁드립니다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyBoard(@ModelAttribute BoardDto.BoardPutTempRequest boardPutTempRequest) {
        List<MultipartFile> files = boardPutTempRequest.getFile();
        List<String> ans = new ArrayList<>();
        if(files.isEmpty() || files == null){
        }
        else {
            for (MultipartFile one : files) {
                ans.add(fireBaseService.upload(one));
            }
        }
        String photo = "";
        if(ans != null && !ans.isEmpty()) {
            for (int i = 0; i < ans.size(); i++) {
                if(i != (ans.size() - 1) )
                {
                    photo += ans.get(i) + ",";
                }else{
                    photo += ans.get(i);
                }
            }
        }
        photo += "";
        BoardDto.BoardPutRequest boardPutRequest = new BoardDto.BoardPutRequest();
        boardPutRequest.setPhoto(photo);
        boardPutRequest.setContent(boardPutTempRequest.getContent());
        boardPutRequest.setTitle(boardPutTempRequest.getTitle());
        boardPutRequest.setNickname(boardPutTempRequest.getNickname());
        boardPutRequest.setPassword(boardPutTempRequest.getPassword());
        boardPutRequest.setId(boardPutTempRequest.getId());
        if(boardService.modifyBoard(boardPutRequest)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }


    @GetMapping("/like/userlist")
    @ApiOperation(value = "해당 유저의 게시글 좋아요 리스트", notes = "<strong>해당 유저의 게시글 좋아요 리스트</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBoardLike(@RequestParam("user_id")Long userId) {
        List<BoardSearch> list = boardlikeService.findBoardLike(userId);
        if(list.size() != 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail",new ArrayList<>()));
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
    public ResponseEntity<? extends BaseResponseBody> modifyBoard(@PathVariable("id") Long id,@RequestParam("password")String password) {
        BoardDto.BoardDeleteRequest dto = new BoardDto.BoardDeleteRequest();
        dto.setId(id);
        dto.setPassword(password);
        if(boardService.removeBoard(dto)) {
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
    public ResponseEntity<? extends BaseResponseBody> findByBoardLike(@RequestParam("size") Integer size, @RequestParam("page") Integer page, @ApiIgnore Pageable pageable) {

        Page<BoardDto.BoardLikeGet> list = boardlikeService.findByBoard(page,size,pageable);
        if(list != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @PostMapping("/like/{boardId}")
    @ApiOperation(value = "게시글 좋아요 등록", notes = "<strong>게시글의 좋아요 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registBoard(@PathVariable("boardId") Long boardId, @RequestParam("user_id")Long userId) {
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

    @GetMapping("/like/user/{boardId}")
    @ApiOperation(value = "게시글 해당 유저가 좋아요 했는지 파악", notes = "<strong>게시글 해당 유저가 좋아요 했는지 파악</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findLikeBoard(@PathVariable("boardId") Long boardId, @RequestParam("userId")Long userId) {
        BoardDto.BoardLikeGetRequest dto = new BoardDto.BoardLikeGetRequest();
        dto.setId(boardId);
        dto.setUserId(userId);
        boolean check = boardlikeService.findLike(dto);
        if(check)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",true));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail",false));
        }
    }

    @GetMapping("/like/week")
    @ApiOperation(value = "한 주의 인기순 정렬", notes = "<strong>한 주의 인기순 정렬</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByBoardLikeWeek() {

        List<BoardDto.BoardLikeGet> list = boardlikeService.findByBoardWeek();
        if(list.size() != 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

}
