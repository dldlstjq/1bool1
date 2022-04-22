package com.ssafy.api.controller;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.RecipeDto;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.FireBaseService;
import com.ssafy.api.service.RecipeService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Recipe;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "글 등록", notes = "프론트 분들에겐 죄송하지만 파일 등록은 무조건 스웨거가 아닌 <strong>POSTMAN</strong>으로 하셔야 합니다! 테스트 하시기 전에 한 번 불러주세요!")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="글 정보", required = true) @ModelAttribute RecipeDto.RecipePostRealRequest recipePostRealRequest) {
        List<MultipartFile> files = recipePostRealRequest.getFile();
        List<String> ans = new ArrayList<>();
        if(files.isEmpty() || files == null){

        }
        else {
            for (MultipartFile one : files) {
                ans.add(fireBaseService.upload(one));
            }
        }

        String photo = "";

        if(ans != null) {
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
        Recipe recipe = recipeService.createRecipe(recipePostRequest);
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
        List<Recipe> recipe = recipeService.findRecipe();
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
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
        List<Recipe> recipe = recipeService.findBySearchRecipe(search);
        if(recipe != null)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
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
    public ResponseEntity<? extends BaseResponseBody> findRecipeDetail(@PathVariable("id") Long id) {
        Recipe recipe = recipeService.findRecipeDetail(id);
        if(recipe != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", recipe));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }


    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "해당 글 수정", notes = "<strong>글의 목록을 가져온다.</strong>")
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
        if(recipeService.modifyRecipe(recipePutRequest)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }    }

    @DeleteMapping("{id}")
    @ApiOperation(value = "해당 글 삭제", notes = "<strong>해당 글을 삭제한다.</strong>")
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
}
