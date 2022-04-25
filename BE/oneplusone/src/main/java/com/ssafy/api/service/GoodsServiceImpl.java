package com.ssafy.api.service;

import com.ssafy.db.entity.Goods;
import com.ssafy.db.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GoodsServiceImpl implements GoodsService{

    @Autowired
    GoodsRepository goodsRepository;

    @Override
    public List<Goods> findGoods() {
        return goodsRepository.findTop10ByOrderByStartDateAsc();
    }

    @Override
    public Goods findGoodsDetail(Long goodsId) {
        return goodsRepository.findById(goodsId).orElseGet(() -> null);
    }
}
