package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Goods;

import java.util.List;
public interface GoodsLikeService {
    boolean modifyGoodsLike(GoodsDto.GoodsLikeGetRequest dto);

    List<GoodsDto.GoodsLikeGetOrderBy> findTop10LikeGoods();

    boolean findLike(GoodsDto.GoodsLikeGetRequest dto);

    GoodsDto.GoodsLikeDetail findLikeGoods(Long goodsId);

    List<Goods> findGoodsLike(Long userId);
}
