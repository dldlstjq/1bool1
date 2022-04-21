package com.ssafy.api.controller;

import com.ssafy.api.service.GoodsService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Goods;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "상품 API", tags = {"Goods"})
@RestController
@RequestMapping("/api/v1/goods")
public class GoodsController {

    @Autowired
    GoodsService goodsService;

    @GetMapping()
    @ApiOperation(value = "전체 상품 조회", notes = "<strong>상품의 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findGoods() {
        List<Goods> goods = goodsService.findGoods();
        if(goods != null && !goods.isEmpty()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "DB 내부에 현재 데이터가 없습니다"));
        }
    }


}
