package com.ssafy.api.controller;

import com.ssafy.api.dto.CommentDto;
import com.ssafy.api.dto.GoodsReviewDto;
import com.ssafy.api.service.CommentService;
import com.ssafy.api.service.GoodsReviewService;
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

@Api(value = "상품 리뷰글 API", tags = {"Goodsreview"})
@RestController
@RequestMapping("/v1/goodsreview")
public class GoodsReviewController {
    @Autowired
    private GoodsReviewService goodsReviewService;

    @GetMapping("{goodsId}")
    @ApiOperation(value = "전체 댓글 조회", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findGoodsReview(@PathVariable("goodsId")Long goodsId) {
        List<GoodsReview> goodsReviews = goodsReviewService.findGoodsReview(goodsId);
        List<GoodsReviewDto.GoodsReviewGetRequest> list = new ArrayList<>();
        GoodsReviewDto.GoodsReviewGetRequest ans;
        for(int i = 0; i < goodsReviews.size(); i++){
            ans = new GoodsReviewDto.GoodsReviewGetRequest();
            ans.setGoodsId(goodsReviews.get(i).getGoods().getId());
            ans.setContent(goodsReviews.get(i).getContent());
            ans.setNickname(goodsReviews.get(i).getNickname());
            ans.setId(goodsReviews.get(i).getId());
            ans.setPassword(goodsReviews.get(i).getPassword());
            list.add(ans);
        }
        if(list.size() > 0) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "댓글이 없습니다.", list));
        }

    }

    @PostMapping("{goodsId}")
    @ApiOperation(value = "댓글 등록", notes = "<strong>댓글 등록</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerGoodsReview(@RequestBody GoodsReviewDto.GoodsReviewPostRequest goodsReviewPostRequest) {
        if(goodsReviewService.createGoodsReview(goodsReviewPostRequest) != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

    @PutMapping("{goodsId}")
    @ApiOperation(value = "댓글 수정", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyComment(@PathVariable("goodsId")Long goodsId, @RequestBody GoodsReviewDto.GoodsReviewPutRequest dto) {
        dto.setGoodsId(goodsId);
        if(goodsReviewService.modifyGoodsReview(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

    @DeleteMapping("{goodsId}")
    @ApiOperation(value = "댓글 삭제", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> removeGoodsReview(@PathVariable("goodsId")Long goodsId, @RequestParam("id") Long id, @RequestParam("password")String pw) {
        GoodsReviewDto.GoodsReviewDeleteRequest dto = new GoodsReviewDto.GoodsReviewDeleteRequest();
        dto.setGoodsId(goodsId);
        dto.setPassword(pw);
        dto.setId(id);
        if(goodsReviewService.removeGoodsReview(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

}
