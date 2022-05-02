package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Goods;


import java.util.List;

public interface GoodsService {
    List<Goods> findTop10UpdateGoods();

    List<Goods> findTop10HitGoods();

//    List<Goods> findTop10LikeGoods();

    List<Goods> findGoodsByConvinenceEvent(GoodsDto.GoodsEventGetRequest goodsEventGetRequest);

    Goods findGoodsDetail(Long goodsId);

    Goods modifyGoodsHit(GoodsDto.GoodsPutRequest goodsPutRequest);
}
