package com.ssafy.api.dto;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Goods;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class GoodsDto {

    @Getter
    @Setter
    @ApiModel("GoodsPutTempRequest")
    public static class GoodsPutTempRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long Id;
        @ApiModelProperty(name="제목", example="제목")
        String name;
        @ApiModelProperty(name="가격", example="5,000")
        Long price;
        @ApiModelProperty(name="사진", example="https:api//.../")
        String photoPath;
        @ApiModelProperty(name="설명", example="컵라면")
        String description;
        @ApiModelProperty(name="행사상품", example="1+1:0")
        Integer event;
        @ApiModelProperty(name="판매여부", example="0")
        Integer isSell;
        @ApiModelProperty(name="분류", example="식품:1")
        Integer category;
        @ApiModelProperty(name="조회수", example="1")
        Integer hit;
        @ApiModelProperty(name="편의점", example="CU")
        String convinence;

    }
    @Getter
    @Setter
    @ApiModel("GoodsPutRequest")
    public static class GoodsPutRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long Id;
        @ApiModelProperty(name="제목", example="제목")
        String name;
        @ApiModelProperty(name="가격", example="5,000")
        Long price;
        @ApiModelProperty(name="사진", example="https:api//.../")
        String photoPath;
        @ApiModelProperty(name="설명", example="컵라면")
        String description;
        @ApiModelProperty(name="행사상품", example="1+1:0")
        Integer event;
        @ApiModelProperty(name="판매여부", example="0")
        Integer isSell;
        @ApiModelProperty(name="분류", example="식품:1")
        Integer category;
        @ApiModelProperty(name="조회수", example="1")
        Integer hit;
        @ApiModelProperty(name="편의점", example="CU")
        String convinence;

        @Builder
        public GoodsPutRequest(Long Id, String name, Long price, String photoPath, String description, Integer category, Integer isSell, Integer event, Integer hit, String convinence){
            this.Id=Id;
            this.name=name;
            this.price=price;
            this.photoPath=photoPath;
            this.description=description;
            this.category=category;
            this.isSell=isSell;
            this.event=event;
            this.hit=hit;
            this.convinence=convinence;
        }

    }

    @Getter
    @Setter
    @ApiModel("GoodsLikeGetRequest")
    public static class GoodsLikeGetRequest {
        @ApiModelProperty(name="id 값", example="1")
        Long id;
        @ApiModelProperty(name="userId 값", example="1")
        Long userId;
    }

    @Getter
    @Setter
    @ApiModel("GoodsLikeGetOrderBy")
    public static class GoodsLikeGetOrderBy {
        @ApiModelProperty(name="Goods", example="객체")
        Goods goods;
        @ApiModelProperty(name="카운트 값", example="1")
        Long cnt;
    }



    @Getter
    @Setter
    @ApiModel("GoodsLikeDetail")
    public static class GoodsLikeDetail {
        @ApiModelProperty(name="Goods", example="객체")
        Long Id;
        @ApiModelProperty(name="Goods", example="객체")
        LocalDateTime CreatedDate;
        @ApiModelProperty(name="Goods", example="객체")
        LocalDateTime modifiedDate;
        @ApiModelProperty(name="Goods", example="객체")
        Integer category;
        @ApiModelProperty(name="Goods", example="객체")
        String convinence;
        @ApiModelProperty(name="Goods", example="객체")
        String description;
        @ApiModelProperty(name="Goods", example="객체")
        Integer event;
        @ApiModelProperty(name="Goods", example="객체")
        Integer hit;
        @ApiModelProperty(name="Goods", example="객체")
        Integer isSell;
        @ApiModelProperty(name="Goods", example="객체")
        String name;
        @ApiModelProperty(name="Goods", example="객체")
        String photoPath;
        @ApiModelProperty(name="Goods", example="객체")
        Long price;
        @ApiModelProperty(name="Goods", example="객체")
        Date startDate;
        @ApiModelProperty(name="Goods", example="객체")
        Date updateDate;

        @ApiModelProperty(name="카운트 값", example="1")
        Long cnt;
    }

    @Getter
    @Setter
    @ApiModel("GoodsEventGetRequest")
    public static class GoodsEventGetRequest {
        @ApiModelProperty(name="편의점 이름", example="cu_gs")
        String convinenceName;
        @ApiModelProperty(name="userId 값", example="3_4")
        String event;
        @ApiModelProperty(name="goods 이름", example="제로")
        String goods;

    }
}
