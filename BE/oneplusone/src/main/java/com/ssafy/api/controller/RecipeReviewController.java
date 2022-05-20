package com.ssafy.api.controller;

import com.ssafy.api.dto.CommentDto;
import com.ssafy.api.dto.GoodsReviewDto;
import com.ssafy.api.dto.RecipeReviewDto;
import com.ssafy.api.service.CommentService;
import com.ssafy.api.service.GoodsReviewService;
import com.ssafy.api.service.RecipeReviewService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.GoodsReview;
import com.ssafy.db.entity.RecipeReview;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "레시피 리뷰글 API", tags = {"RecipeReview"})
@RestController
@RequestMapping("/v1/recipereview")
public class RecipeReviewController {
    @Autowired
    private RecipeReviewService recipeReviewService;

    @GetMapping("{recipeId}")
    @ApiOperation(value = "전체 리뷰 조회", notes = "<strong>리뷰의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findRecipeReview(@PathVariable("recipeId")Long recipeId) {
        List<RecipeReview> recipeReview = recipeReviewService.findRecipeReview(recipeId);
        List<RecipeReviewDto.RecipeReviewGetRequest> list = new ArrayList<>();
        RecipeReviewDto.RecipeReviewGetRequest ans;
        for(int i = 0; i < recipeReview.size(); i++){
            ans = new RecipeReviewDto.RecipeReviewGetRequest();
            ans.setRecipeId(recipeReview.get(i).getRecipe().getId());
            ans.setContent(recipeReview.get(i).getContent());
            ans.setNickname(recipeReview.get(i).getNickname());
            ans.setId(recipeReview.get(i).getId());
            ans.setPassword(recipeReview.get(i).getPassword());
            list.add(ans);
        }
        if(list.size() > 0) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "댓글이 없습니다.", list));
        }

    }

    @PostMapping("{recipeId}")
    @ApiOperation(value = "댓글 등록", notes = "<strong>댓글 등록</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerRecipeReview(@RequestBody RecipeReviewDto.RecipeReviewPostRequest recipeReviewPostRequest) {
        if(recipeReviewService.createRecipeReview(recipeReviewPostRequest) != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

    @PutMapping("{recipeId}")
    @ApiOperation(value = "댓글 수정", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyRecipeReview(@PathVariable("recipeId")Long recipeId, @RequestBody RecipeReviewDto.RecipeReviewPutRequest dto) {
        dto.setRecipeId(recipeId);
        if(recipeReviewService.modifyRecipeReview(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

    @DeleteMapping("{recipeId}")
    @ApiOperation(value = "댓글 삭제", notes = "<strong>댓글의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> removeRecipeReview(@PathVariable("recipeId")Long recipeId, @RequestParam("id") Long id, @RequestParam("password")String pw) {
        RecipeReviewDto.RecipeReviewDeleteRequest dto = new RecipeReviewDto.RecipeReviewDeleteRequest();
        dto.setRecipeId(recipeId);
        dto.setPassword(pw);
        dto.setId(id);
        if(recipeReviewService.removeRecipeReview(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }

}
