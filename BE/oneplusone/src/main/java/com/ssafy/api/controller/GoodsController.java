package com.ssafy.api.controller;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.api.dto.RecipeDto;
import com.ssafy.api.service.GoodsLikeService;
import com.ssafy.api.service.GoodsService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Convinence;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.Recipe;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@Api(value = "상품 API", tags = {"Goods"})
@RestController
@CrossOrigin("*")
@RequestMapping("/v1/goods")
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


    @GetMapping("")
    @ApiOperation(value = "전체 상품 조회", notes = "<strong>전체 물품 목록을 모두 가져온다</strong>")
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

    @GetMapping("/like/userlist")
    @ApiOperation(value = "해당 유저의 상품 좋아요 리스트", notes = "<strong>해당 유저의 상품 좋아요 리스트</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findGoodsLike(@RequestParam("user_id")Long userId) {
        List<Goods> list = goodsLikeService.findGoodsLike(userId);
        if(list.size() != 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail",new ArrayList<>()));
        }
    }
    
    @GetMapping("/search")
    @ApiOperation(value = "검색 내용 조회", notes = "<strong>검색된 상품 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBySearchGoods(@RequestParam("search") String search) {
        List<Goods> goods = goodsService.findBySearchGoods(search);
        if(goods.size() > 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "제목과 내용 모두 찾아 봤지만 존재 하지 않습니다."));
        }
    }

    @GetMapping("/convinence")
    @ApiOperation(value = "해당 편의점 검색 결과 조회", notes = "<strong>cs = 시스페이스 , cu = CU , em = 이마트 , gs = GS25 , ms = 미니스톱, se = 세븐일레븐 </strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBySearchConGoods(@RequestParam("con") String search) {
        List<Goods> goods = goodsService.findBySearchConGoods(search);
        if(goods.size() > 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "제목과 내용 모두 찾아 봤지만 존재 하지 않습니다."));
        }
    }

    @GetMapping("/name")
    @ApiOperation(value = "편의점 이름 검색 결과 조회", notes = "<strong>편의점 이름 목록을 가져온다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findBySearchCon() {
        List<Convinence> list = goodsService.findBySearchCon();
        if(list.size() > 0)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "제목과 내용 모두 찾아 봤지만 존재 하지 않습니다."));
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
        List<GoodsDto.GoodsPutRequest> goods = goodsService.findTop10HitGoods();
        if(goods != null && !goods.isEmpty()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "조회수 등록된 상품이 없습니다."));
        }
    }

    @GetMapping("/like")
    @ApiOperation(value = "좋아요 TOP10 상품 조회", notes = "<strong>좋아요 top10 상품 목륵을 가져온다</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findTop10LikeGoods() {
        List<GoodsDto.GoodsLikeGetOrderBy> goods = goodsLikeService.findTop10LikeGoods();
        if(goods != null && !goods.isEmpty()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", goods));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "좋아요 상품이 없습니다"));
        }
    }

    @GetMapping("/like/{goodsId}")
    @ApiOperation(value = "해당 상품 좋아요 갯수 리턴 ", notes = "<strong>해당하는 상품에서 좋아요 갯수를 리턴</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findGoodsLikeDetail(@PathVariable("goodsId") Long goodsId){
        GoodsDto.GoodsLikeDetail goodsLikeDetail = goodsLikeService.findLikeGoods(goodsId);
        if(goodsLikeDetail != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",goodsLikeDetail));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
        }
    }


    @PutMapping("/like/{goodsId}")
    @ApiOperation(value = "상품 좋아요 등록 및 삭제", notes = "<strong>상품에서 등록 및 삭제</strong>")
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

        GoodsDto.GoodsPutRequest goodsPutRequest = new GoodsDto.GoodsPutRequest(
                goods.getId(),
                goods.getName(),
                goods.getPrice(),
                goods.getPhotoPath(),
                goods.getDescription(),
                goods.getCategory(),
                goods.getIsSell(),
                goods.getEvent(),
                goods.getHit(),
                goods.getConvinence()
        );
        if(goods.getHit() == null)
            goodsPutRequest.setHit(1);
        else
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

    @GetMapping("/conGoods")
    @ApiOperation(value = "해당 편의점의 행사 상품을 가져온다", notes = "<strong>해당 편의점의 행사 상품을 가져온다</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findGoodsByConvinenceNameEvent(@RequestParam("convinenceName") String convinenceName, @RequestParam("event") String event,@RequestParam("goods") String goods) {
        GoodsDto.GoodsEventGetRequest dto = new GoodsDto.GoodsEventGetRequest();
        dto.setConvinenceName(convinenceName);
        dto.setEvent(event);
        dto.setGoods(goods);
        List<Goods> list = goodsService.findGoodsByConvinenceEvent(dto);
        if(list != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "DB 내부에 현재 데이터가 없습니다"));
        }
    }

    @GetMapping("/like/user/{goodsId}")
    @ApiOperation(value = "레시피 해당 유저가 좋아요 했는지 파악", notes = "<strong>레시피 해당 유저가 좋아요 했는지 파악</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findLikeGoods(@PathVariable("goodsId") Long goodsId, @RequestParam("userId")Long userId) {
        GoodsDto.GoodsLikeGetRequest dto = new GoodsDto.GoodsLikeGetRequest();
        dto.setId(goodsId);
        dto.setUserId(userId);
        boolean check = goodsLikeService.findLike(dto);
        if(check)
        {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",true));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail",false));
        }
    }


}
