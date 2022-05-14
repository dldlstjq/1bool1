package com.ssafy.api.dto;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
public class RecipeDto {
    /**
     * Board 등록
     */
    @Data
    @ApiModel("RecipePostRequest")
    public static class RecipePostRequest {
        @ApiModelProperty(name="제목", example="제목")
        String title;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="사진 경로", example="123232.jpg")
        String photo;
        @ApiModelProperty(name="설명", example="이 요리는 맛있다")
        String description;
        @ApiModelProperty(name="시간", example="60")
        Integer minute;
        @ApiModelProperty(name="난이도", example="1")
        Integer star;
//        @ApiModelProperty(name="시작 시간", example="2022-02-01")
//        Date startDate;
        @ApiModelProperty(name="GoodsId", example="1,2,3,4")
        String GoodsId;
    }
    /*
     * Board 등록 사진 제대로
     * */
    @Getter
    @Setter
    @ApiModel("RecipePostRealRequest")
    public static class RecipePostRealRequest {
        @ApiModelProperty(name="사진", example="사진")
        List<MultipartFile> file;
        @ApiModelProperty(name="제목", example="제목")
        String title;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="설명", example="이 요리는 맛있다")
        String description;
        @ApiModelProperty(name="시간", example="60")
        Integer minute;
        @ApiModelProperty(name="난이도", example="1")
        Integer star;
        @ApiModelProperty(name="GoodsId", example="1,2,3,4")
        String GoodsId;

    }
    @Getter
    @Setter
    @ApiModel("RecipePutRequest")
    public static class RecipePutRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long id;
        @ApiModelProperty(name="제목", example="제목")
        String title;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="사진 경로", example="123232.jpg")
        String photo;
        @ApiModelProperty(name="GoodsId", example="1,2,3,4")
        String GoodsId;
        @ApiModelProperty(name="설명", example="이 요리는 맛있다")
        String description;
        @ApiModelProperty(name="시간", example="60")
        Integer minute;
        @ApiModelProperty(name="난이도", example="1")
        Integer star;
        // @ApiModelProperty(name="현 시간", example="2022-02-01")
        // Date updateDate;
    }

    @Getter
    @Setter
    @ApiModel("RecipePutTempRequest")
    public static class RecipePutTempRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long Id;
        @ApiModelProperty(name="사진", example="사진")
        List<MultipartFile> file;
        @ApiModelProperty(name="제목", example="제목")
        String title;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="GoodsId", example="1,2,3,4")
        String GoodsId;
        @ApiModelProperty(name="설명", example="이 요리는 맛있다")
        String description;
        @ApiModelProperty(name="시간", example="60")
        Integer minute;
        @ApiModelProperty(name="난이도", example="1")
        Integer star;
    }

    @Getter
    @Setter
    @ApiModel("RecipeLikeGetRequest")
    public static class RecipeLikeGetRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long id;
        @ApiModelProperty(name="userId 값", example="1")
        Long userId;
    }


    @Getter
    @Setter
    @ApiModel("RecipeDeleteRequest")
    public static class RecipeDeleteRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long id;
        @ApiModelProperty(name="nickname", example="nickname")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
    }

    @Getter
    @Setter
    @ApiModel("RecipeLikeGetOrderBy")
    public static class RecipeLikeGetOrderBy {
        @ApiModelProperty(name="Recipe", example="객체")
        Recipe recipe;
        @ApiModelProperty(name="카운트 값", example="1")
        Long cnt;
    }

    @Getter
    @Setter
    @ApiModel("RecipeLikeGet")
    public static class RecipeLikeGet {
        @ApiModelProperty(name="recipeId", example="객체")
        Long recipeId;
        @ApiModelProperty(name="cnt", example="1")
        Long cnt;
    }

    @Getter
    @Setter
    @ApiModel("RecipeGetDetail")
    public static class RecipeGetDetail{
        @ApiModelProperty(name="recipe_id", example="1")
        Long recipeId;
        @ApiModelProperty(name="goodsPhoto", example="1.jpg")
        String goodsPhoto;

    }

}
