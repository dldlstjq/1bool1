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
public class CommentDto {
    /**
     * Comment 등록
     */
    @Getter
    @Setter
    @ApiModel("CommentPostRequest")
    public static class CommentPostRequest {
        @ApiModelProperty(name="content", example="내용")
        String content;
        @ApiModelProperty(name="nickname", example="닉네임")
        String nickname;
        @ApiModelProperty(name="password", example="a1234!@")
        String password;
        @ApiModelProperty(name="board Id", example="1")
        Long boardId;

    }
    @Getter
    @Setter
    @ApiModel("CommentPutRequest")
    public static class CommentPutRequest {
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="닉네임", example="닉네임")
        String nickname;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="board Id", example="1")
        Long boardId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
    @Getter
    @Setter
    @ApiModel("CommentDeleteRequest")
    public static class CommentDeleteRequest {

        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="board Id", example="1")
        Long boardId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
    @Getter
    @Setter
    @ApiModel("CommentGetRequest")
    public static class CommentGetRequest {
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
        @ApiModelProperty(name="닉네임", example="nickname")
        String nickname;
        @ApiModelProperty(name="내용", example="내용")
        String content;
        @ApiModelProperty(name="board Id", example="1")
        Long boardId;
        @ApiModelProperty(name="Id", example="1")
        Long Id;
    }
}
