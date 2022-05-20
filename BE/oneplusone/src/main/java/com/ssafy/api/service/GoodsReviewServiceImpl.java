package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsReviewDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.GoodsReview;
import com.ssafy.db.repository.GoodsReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class GoodsReviewServiceImpl implements GoodsReviewService{

    @Autowired
    GoodsReviewRepository goodsReviewRepository;
    @Override
    public List<GoodsReview> findGoodsReview(Long goodsId) {
            return goodsReviewRepository.findByGoodsId(goodsId);
    }

    @Override
    @Transactional
    public GoodsReview createGoodsReview(GoodsReviewDto.GoodsReviewPostRequest goodsReviewPostRequest) {
        GoodsReview goodsReview = new GoodsReview();
        Goods goods = new Goods();
        goods.setId(goodsReviewPostRequest.getGoodsId());
        goodsReview.setContent(goodsReviewPostRequest.getContent());
        goodsReview.setGoods(goods);
        goodsReview.setPassword(goodsReviewPostRequest.getPassword());
        goodsReview.setNickname(goodsReviewPostRequest.getNickname());
        return goodsReviewRepository.save(goodsReview);
    }

    @Override
    @Transactional
    public boolean modifyGoodsReview(GoodsReviewDto.GoodsReviewPutRequest dto) {
        GoodsReview goodsReview;
        goodsReview = goodsReviewRepository.findByGoodsIdAndIdAndPassword(dto.getGoodsId(),dto.getId(),dto.getPassword());
        if(goodsReview == null){
            return false;
        }else {

            goodsReview.update(dto.getNickname(), dto.getContent(), dto.getPassword());
            return true;
        }
    }

    @Override
    public boolean removeGoodsReview(GoodsReviewDto.GoodsReviewDeleteRequest dto) {
        GoodsReview goodsReview;
        goodsReview = goodsReviewRepository.findByGoodsIdAndIdAndPassword(dto.getGoodsId(),dto.getId(),dto.getPassword());
        if(goodsReview == null){
            return false;
        }else {
            goodsReviewRepository.delete(goodsReview);
            return true;
        }
    }
}
