package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsReviewDto;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.GoodsReview;

import java.util.List;

public interface GoodsReviewService {
    List<GoodsReview> findGoodsReview(Long goodsId);

    GoodsReview createGoodsReview(GoodsReviewDto.GoodsReviewPostRequest goodsReviewPostRequest);

    boolean modifyGoodsReview(GoodsReviewDto.GoodsReviewPutRequest dto);

    boolean removeGoodsReview(GoodsReviewDto.GoodsReviewDeleteRequest dto);
}
