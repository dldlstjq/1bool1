package com.ssafy.api.controller;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.api.service.GoodsLikeService;
import com.ssafy.api.service.GoodsService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Goods;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.List;

@Api(value = "상품 API", tags = {"Goods"})
@RestController
@RequestMapping("/api/v1/goods")
public class GoodsController {

    @Autowired
    GoodsService goodsService;

    @Autowired
    GoodsLikeService goodsLikeService;

    @GetMapping("/updateDate")
    @ApiOperation(value = "최근 업데이트 상품 조회", notes = "<strong>최근 업데이트된 상품 10개 목륵을 가져온다</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findTop10UpdateGoods() {
        List<Goods> goods = goodsService.findTop10UpdateGoods();
        if(goods != null && !goods.isEmpty()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "DB 내부에 현재 데이터가 없습니다"));
        }
    }

    @GetMapping("/hit")
    @ApiOperation(value = "조회수 TOP10 상품 조회", notes = "<strong>최근 업데이트된 상품 10개 목륵을 가져온다</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findTop10HitGoods() {
        List<Goods> goods = goodsService.findTop10HitGoods();
        if(goods != null && !goods.isEmpty()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "DB 내부에 현재 데이터가 없습니다"));
        }
    }

//    @GetMapping("/updateDate")
//    @ApiOperation(value = "좋아요 TOP10 상품 조회", notes = "<strong>최근 업데이트된 상품 10개 목륵을 가져온다</strong>")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<? extends BaseResponseBody> findTop10LikeGoods() {
//        List<Goods> goods = goodsService.findTop10LikeGoods();
//        if(goods != null && !goods.isEmpty()) {
//            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
//        }else{
//            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "DB 내부에 현재 데이터가 없습니다"));
//        }
//    }

    @PutMapping("/like/{goodsId}")
    @ApiOperation(value = "상품 좋아요 등록", notes = "<strong>상품에서 좋아요를 클릭한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerGoodsLike(@PathVariable("goodsId") Long goodsId, @RequestParam("user_id")Long userId){
        GoodsDto.GoodsLikeGetRequest dto = new GoodsDto.GoodsLikeGetRequest();
        dto.setId(goodsId);
        dto.setUserId(userId);
        if(goodsLikeService.modifyGoodsLike(dto)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }

    }

    @PutMapping("/{goodsId}")
    @ApiOperation(value = "상품 조회수 등록", notes = "<strong>상품을 클릭했을때 조회수를 등록한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerGoodsHit(@PathVariable("goodsId") Long goodsId){

        Goods goods = new Goods();
        goods = goodsService.findGoodsDetail(goodsId);

        GoodsDto.GoodsPutRequest goodsPutRequest = new GoodsDto.GoodsPutRequest();
        goodsPutRequest.setId(goods.getId());
        goodsPutRequest.setName(goods.getName());
        goodsPutRequest.setPrice(goods.getPrice());
        goodsPutRequest.setPhotoPath(goods.getPhotoPath());
        goodsPutRequest.setDescription(goods.getDescription());
        goodsPutRequest.setEvent(goods.getEvent());
        goodsPutRequest.setIsSell(goods.getIsSell());
        goodsPutRequest.setCategory(goods.getCategory());
        goodsPutRequest.setHit(goods.getHit()+1);
        goodsPutRequest.setConvinence(goods.getConvinence());

        Goods hitGoods = goodsService.modifyGoodsHit(goodsPutRequest);
        if(hitGoods != null)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
    }


    @GetMapping("{goodsId}")
    @ApiOperation(value = "상세 상품 조회", notes = "<strong>상품의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findGoodsDetail(@PathVariable("goodsId") Long goodsId) {
        Goods goods = goodsService.findGoodsDetail(goodsId);
        if(goods != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "DB 내부에 현재 데이터가 없습니다"));
        }
    }

}
