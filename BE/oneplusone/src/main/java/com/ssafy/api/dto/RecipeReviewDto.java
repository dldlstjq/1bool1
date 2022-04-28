package com.ssafy.api.dto;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;

@AllArgsConstructor
public class RecipeReviewDto {
    /**
     * Comment 등록
     */
    @Getter
    @Setter
    @ApiModel("RecipeReviewPostRequest")
    public static class RecipeReviewPostRequest {
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="recipe Id", example="1")
        Long recipeId;

    }
    @Getter
    @Setter
    @ApiModel("RecipeReviewPutRequest")
    public static class RecipeReviewPutRequest {
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="recipe Id", example="1")
        Long recipeId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
    @Getter
    @Setter
    @ApiModel("RecipeReviewDeleteRequest")
    public static class RecipeReviewDeleteRequest {

        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="recipe Id", example="1")
        Long recipeId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
    @Getter
    @Setter
    @ApiModel("RecipeReviewGetRequest")
    public static class RecipeReviewGetRequest {

        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="닉네임", example="nickname")
        String nickname;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="recipe Id", example="1")
        Long recipeId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }

}
