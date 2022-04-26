package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Goods;

import java.util.List;
public interface GoodsLikeService {
    boolean modifyGoodsLike(GoodsDto.GoodsLikeGetRequest dto);
}
