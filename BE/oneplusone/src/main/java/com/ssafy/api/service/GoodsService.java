package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Goods;

import java.util.List;

public interface GoodsService {
    List<Goods> findTop10UpdateGoods();

    List<GoodsDto.GoodsPutRequest> findTop10HitGoods();

//    List<Goods> findTop10LikeGoods();

    Goods findGoodsDetail(Long goodsId);

    Goods modifyGoodsHit(GoodsDto.GoodsPutRequest goodsPutRequest);
}
