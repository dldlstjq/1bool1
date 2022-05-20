package com.ssafy.api.dto;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
public class BoardDto {
    /**
     * Board 등록
     */
    @Data
    @ApiModel("BoardPostRequest")
    public static class BoardPostRequest {
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
    }

    @Data
    @ApiModel("BoardDeleteRequest")
    public static class BoardDeleteRequest {
        @ApiModelProperty(name="글 번호", example="글 번호")
        Long Id;
        @ApiModelProperty(name="비밀번호", example="a1234!@")
        String password;
    }
    @Getter
    @Setter
    @ApiModel("BoardPostRealRequest")
    public static class BoardPostRealRequest {
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

    }

    @Getter
    @Setter
    @ApiModel("BoardPutTempRequest")
    public static class BoardPutTempRequest {
        @ApiModelProperty(name="id", example="1")
        Long Id;
        @ApiModelProperty(name="file", example="사진")
        List<MultipartFile> file;
        @ApiModelProperty(name="title", example="제목")
        String title;
        @ApiModelProperty(name="content", example="내용")
        String content;
        @ApiModelProperty(name="nickname", example="닉네임")
        String nickname;
        @ApiModelProperty(name="password", example="a1234!@")
        String password;

    }
    @Getter
    @Setter
    @ApiModel("BoardPutRequest")
    public static class BoardPutRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long Id;
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
    }

    @Getter
    @Setter
    @ApiModel("BoardLikeGetRequest")
    public static class BoardLikeGetRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long id;
        @ApiModelProperty(name="userId 값", example="1")
        Long userId;
    }

    @Getter
    @Setter
    @ApiModel("BoardLikeGetOrderBy")
    public static class BoardLikeGetOrderBy {
        @ApiModelProperty(name="Board", example="객체")
        Board board;
        @ApiModelProperty(name="카운트 값", example="1")
        Long cnt;
    }
    @Getter
    @Setter
    @ApiModel("BoardLikeGet")
    public static class BoardLikeGet{
        @ApiModelProperty(name="BoardId", example="객체")
        String password;
        @ApiModelProperty(name="BoardId", example="객체")
        String photo;
        @ApiModelProperty(name="BoardId", example="객체")
        String title;
        @ApiModelProperty(name="BoardId", example="객체")
        LocalDateTime CreatedDate;
        @ApiModelProperty(name="BoardId", example="객체")
        LocalDateTime ModifiedDate;
        @ApiModelProperty(name="BoardId", example="객체")
        String nickname;
        @ApiModelProperty(name="BoardId", example="객체")
        String content;
        @ApiModelProperty(name="BoardId", example="객체")
        Long Id;
        @ApiModelProperty(name="카운트 값", example="1")
        Long cnt;
    }
}
