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
public class BoardDto {
    /**
     * Board 등록
     */
    @Getter
    @Setter
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
    
}
