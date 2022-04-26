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
public class GoodsReviewDto {
    /**
     * Comment 등록
     */
    @Getter
    @Setter
    @ApiModel("GoodsReviewPostRequest")
    public static class GoodsReviewPostRequest {
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="goods Id", example="1")
        Long goodsId;

    }
    @Getter
    @Setter
    @ApiModel("GoodsReviewPutRequest")
    public static class GoodsReviewPutRequest {
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="goods Id", example="1")
        Long goodsId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
    @Getter
    @Setter
    @ApiModel("GoodsReviewDeleteRequest")
    public static class GoodsReviewDeleteRequest {

        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="goods Id", example="1")
        Long goodsId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
    @Getter
    @Setter
    @ApiModel("GoodsReviewGetRequest")
    public static class GoodsReviewGetRequest {

        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="닉네임", example="nickname")
        String nickname;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="goods Id", example="1")
        Long goodsId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }

}
