package com.ssafy.api.controller;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.RecipeDto;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.FireBaseService;
import com.ssafy.api.service.RecipeLikeService;
import com.ssafy.api.service.RecipeService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeGoodsSelect;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Api(value = "레시피 API", tags = {"Recipe"})
@RestController
@RequestMapping("/api/v1/recipe")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @Autowired
    FireBaseService fireBaseService;

    @Autowired
    RecipeLikeService recipeLikeService;



    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @ApiOperation(value = "레시피 등록", notes = "프론트 분들에겐 죄송하지만 파일 등록은 무조건 스웨거가 아닌 <strong>POSTMAN</strong>으로 하셔야 합니다! 테스트 하시기 전에 한 번 불러주세요!")
        @ApiResponses({
                @ApiResponse(code = 200, message = "성공"),
                @ApiResponse(code = 401, message = "인증 실패"),
                @ApiResponse(code = 404, message = "사용자 없음"),
                @ApiResponse(code = 500, message = "서버 오류")
        })
        public ResponseEntity<? extends BaseResponseBody> register(
                @RequestBody @ApiParam(value="레시피 정보", required = true) @ModelAttribute RecipeDto.RecipePostRealRequest recipePostRealRequest) {
            List<MultipartFile> files = recipePostRealRequest.getFile();
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
        RecipeDto.RecipePostRequest recipePostRequest = new RecipeDto.RecipePostRequest();
        recipePostRequest.setPhoto(photo);
        recipePostRequest.setNickname(recipePostRealRequest.getNickname());
        recipePostRequest.setContent(recipePostRealRequest.getContent());
        recipePostRequest.setTitle(recipePostRealRequest.getTitle());
        recipePostRequest.setPassword(recipePostRealRequest.getPassword());
        recipePostRequest.setGoodsId(recipePostRealRequest.getGoodsId());
        if(recipeService.createRecipe(recipePostRequest)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "재료 등록 없이 등록하셨습니다."));

        }
    }

    @GetMapping()
    @ApiOperation(value = "전체 글 조회", notes = "<strong>글의 목록을 가져온다.</strong>"+
            "<br/> page는 몇 페이지인지를 나타내고 size는 가져올 글의 개수입니다. " +
            "<br/> page는 0부터 시작이고 데이터가 있으면 리스트가, 가져올 데이터가 없으면 게시글이 없다는 메시지기 반환됩니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBoard(@RequestParam Integer page, Integer size) {
//        List<Recipe> recipe = recipeService.findRecipe();
        List<Recipe> recipe = recipeService.findRecipe(page, size).getContent();
        if(recipe.isEmpty()) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "해당 페이지에 레시피가 없습니다."));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
    }

    @GetMapping("/search")
    @ApiOperation(value = "검색 리ㅔ시피 조회", notes = "<strong>검색된 레시피의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBySearchRecipe(@RequestParam("search") String search) {
        List<Recipe> recipe = recipeService.findBySearchRecipe(search);
        if(recipe.size() > 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "제목과 내용 모두 찾아 봤지만 존재 하지 않습니다."));
        }
    }

    @GetMapping("{id}")
    @ApiOperation(value = "레시피 상세 조회", notes = "<strong>레시피의 정보를 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findRecipeDetail(@PathVariable("id") Long id) {
        Recipe recipe = recipeService.findRecipeDetail(id);
        if(recipe != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }


    @GetMapping("/goods/{id}")
    @ApiOperation(value = "레시피 재료 사진 상세 조회", notes = "<strong>해당 레시피의 재료 정보를 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findRecipeGoodsDetail(@PathVariable("id") Long id) {
        List<RecipeGoodsSelect> recipe = recipeService.findRecipeDetailGoods(id);
        if(recipe != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "레시피 수정", notes = "<strong>POSTMAN 이용 바랍니다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyRecipe(@ModelAttribute RecipeDto.RecipePutTempRequest recipeTempPutRequest) {
        List<MultipartFile> files = recipeTempPutRequest.getFile();
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
        RecipeDto.RecipePutRequest recipePutRequest = new RecipeDto.RecipePutRequest();
        recipePutRequest.setPhoto(photo);
        recipePutRequest.setContent(recipeTempPutRequest.getContent());
        recipePutRequest.setTitle(recipeTempPutRequest.getTitle());
        recipePutRequest.setNickname(recipeTempPutRequest.getNickname());
        recipePutRequest.setPassword(recipeTempPutRequest.getPassword());
        recipePutRequest.setId(recipeTempPutRequest.getId());
        recipePutRequest.setGoodsId(recipeTempPutRequest.getGoodsId());
        if(recipeService.modifyRecipe(recipePutRequest)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }    }

    @DeleteMapping("{id}")
    @ApiOperation(value = "레시피 삭제", notes = "<strong>레시피를 삭제한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyBoard(@PathVariable("id") Long id) {
        if(recipeService.removeRecipe(id)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @GetMapping("/like/{recipeId}")
    @ApiOperation(value = "해당 레시피의 좋아요 갯수를 리턴함", notes = "<strong>레시피의 좋아요 갯수를 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByRecipe(@PathVariable("recipeId") Long id) {
        RecipeDto.RecipeLikeGetRequest dto = new RecipeDto.RecipeLikeGetRequest();
        dto.setId(id);
        Long recipe = recipeLikeService.findByRecipeId(dto);
        if(recipe != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
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
    public ResponseEntity<? extends BaseResponseBody> findByRecipeLike() {

        List<RecipeDto.RecipeLikeGetOrderBy> list = recipeLikeService.findByRecipe();
        if(list != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @PostMapping("/like/{recipeId}")
    @ApiOperation(value = "레시피 좋아요 등록", notes = "<strong>레시피의 좋아요 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registRecipe(@PathVariable("recipeId") Long recipeId, @RequestParam("user_id")Long userId) {
        RecipeDto.RecipeLikeGetRequest dto = new RecipeDto.RecipeLikeGetRequest();
        dto.setId(recipeId);
        dto.setUserId(userId);
        if(recipeLikeService.modifyRecipeLike(dto))
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }


}
