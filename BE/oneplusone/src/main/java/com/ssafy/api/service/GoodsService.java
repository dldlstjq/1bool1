package com.ssafy.api.service;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Goods;

import java.util.List;

public interface GoodsService {
    List<Goods> findGoods();

    Goods findGoodsDetail(Long goodsId);
}
