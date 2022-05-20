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
import com.ssafy.db.entity.RecipeAll;
import com.ssafy.db.entity.RecipeGoodsSelect;
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

@Api(value = "레시피 API", tags = {"Recipe"})
@RestController
@CrossOrigin("*")
@RequestMapping("/v1/recipe")
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
        recipePostRequest.setPrice(recipePostRealRequest.getPrice());
        recipePostRequest.setPhoto(photo);
        recipePostRequest.setNickname(recipePostRealRequest.getNickname());
        recipePostRequest.setContent(recipePostRealRequest.getContent());
        recipePostRequest.setTitle(recipePostRealRequest.getTitle());
        recipePostRequest.setPassword(recipePostRealRequest.getPassword());
        recipePostRequest.setGoodsId(recipePostRealRequest.getGoodsId());
        recipePostRequest.setDescription(recipePostRealRequest.getDescription());
        recipePostRequest.setMinute(recipePostRealRequest.getMinute());
        recipePostRequest.setStar(recipePostRealRequest.getStar());
        if(recipeService.createRecipe(recipePostRequest)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "재료 등록 없이 등록하셨습니다."));

        }
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
        List<RecipeAll> recipe = recipeService.findRecipeAll();
        if(recipe.isEmpty()) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "해당 페이지에 레시피가 없습니다."));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
    }

    @GetMapping("/search")
    @ApiOperation(value = "검색 레시피 조회", notes = "<strong>검색된 레시피의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBySearchRecipe(@RequestParam("search") String search) {
        List<RecipeAll> recipe = recipeService.findBySearchRecipe(search);
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
        if(CollectionUtils.isEmpty(files)){
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
        recipePutRequest.setStar(recipeTempPutRequest.getStar());
        recipePutRequest.setDescription(recipeTempPutRequest.getDescription());
        recipePutRequest.setMinute(recipeTempPutRequest.getMinute());
        recipePutRequest.setPrice(recipeTempPutRequest.getPrice());
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
    public ResponseEntity<? extends BaseResponseBody> modifyBoard(@PathVariable("id") Long id,@RequestParam("nickname") String nickname,@RequestParam("password")String pw) {
        RecipeDto.RecipeDeleteRequest dto = new RecipeDto.RecipeDeleteRequest();
        dto.setId(id);
        dto.setNickname(nickname);
        dto.setPassword(pw);
        if(recipeService.removeRecipe(dto)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "nickname 또는 password 값이 틀렸거나 존재하지 않는 레시피 ID 입니다."));
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

        List<RecipeDto.RecipeLikeGet> list = recipeLikeService.findByRecipe();
        if(list != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @GetMapping("/price")
    @ApiOperation(value = "가격 순 정렬", notes = "<strong>parameter = 0 낮은 가격 순 / 1 높은 가격순</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findRecipe(@RequestParam("order") Integer order) {
        List<Recipe> recipe = recipeService.findRecipePrice(order);
        if(recipe.isEmpty()) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "해당 페이지에 레시피가 없습니다."));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
    }



    @GetMapping("/like/week")
    @ApiOperation(value = "한 주의 인기순 정렬", notes = "<strong>한 주의 인기순 정렬</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByRecipeLikeWeek() {

        List<RecipeDto.RecipeLikeGet> list = recipeLikeService.findByRecipeWeek();
        if(list.size() != 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }

    @GetMapping("/like/top")
    @ApiOperation(value = "top4 정렬", notes = "<strong>Top4 정렬</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findByRecipeTop() {

        List<RecipeDto.RecipeLikeGet> list = recipeLikeService.findByRecipeTop();
        if(list.size() != 0)
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

    @GetMapping("/like/userlist")
    @ApiOperation(value = "해당 유저의 레시피 좋아요 리스트", notes = "<strong>해당 유저의 레시피 좋아요 리스트</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findRecipeLike(@RequestParam("user_id")Long userId) {
        List<Recipe> list = recipeLikeService.findRecipeLike(userId);
        if(list.size() != 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail",new ArrayList<>()));
        }
    }

    @GetMapping("/like/user/{recipeId}")
    @ApiOperation(value = "레시피 해당 유저가 좋아요 했는지 파악", notes = "<strong>레시피 해당 유저가 좋아요 했는지 파악</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findLikeRecipe(@PathVariable("recipeId") Long recipeId, @RequestParam("userId")Long userId) {
        RecipeDto.RecipeLikeGetRequest dto = new RecipeDto.RecipeLikeGetRequest();
        dto.setId(recipeId);
        dto.setUserId(userId);
        boolean check = recipeLikeService.findLike(dto);
        if(check)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",true));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail",false));
        }
    }

}
