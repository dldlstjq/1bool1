package com.ssafy.api.dto;

import com.ssafy.common.model.response.BaseResponseBody;
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
        @ApiModelProperty(name="시작 시간", example="2022-02-01")
        Date startDate;
    }
    /*
    * Board 등록 사진 제대로
    * */
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
    @ApiModel("BoardPutRequest")
    public static class BoardPutRequest {
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
        @ApiModelProperty(name="현 시간", example="2022-02-01")
        Date updateDate;
    }
    
}
