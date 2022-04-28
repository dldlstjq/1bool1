package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class GoodsServiceImpl implements GoodsService{

    @Autowired
    GoodsRepository goodsRepository;

    @Override
    public List<Goods> findTop10UpdateGoods() {
        return goodsRepository.findTop10ByOrderByUpdateDateDesc();
    }

    @Override
    public List<Goods> findTop10HitGoods() {
        return goodsRepository.findTop10ByOrderByHitDesc();
    }

//    @Override
//    public List<Goods> findTop10LikeGoods() {
//        return goodsRepository.findTop10ByOrderByLikeDesc();
//    }

    @Override
    public Goods findGoodsDetail(Long goodsId) {
        return goodsRepository.findById(goodsId).orElseGet(() -> null);
    }

    @Override
    @Transactional
    public Goods modifyGoodsHit(GoodsDto.GoodsPutRequest goodsPutRequest){
        Goods goods = goodsRepository.findById(goodsPutRequest.getId()).orElseGet(()->null);

        if(goods != null){
//            goods.update(goodsPutRequest);
            goods.setName(goodsPutRequest.getName());
            goods.setPrice(goodsPutRequest.getPrice());
            goods.setPhotoPath(goodsPutRequest.getPhotoPath());
            goods.setDescription(goodsPutRequest.getDescription());
            goods.setEvent(goodsPutRequest.getEvent());
            goods.setIsSell(goodsPutRequest.getIsSell());
            goods.setCategory(goodsPutRequest.getCategory());
            goods.setHit(goodsPutRequest.getHit());
            goods.setConvinence(goodsPutRequest.getConvinence());
//            goods.update(goodsPutRequest.getName(), goodsPutRequest.getPrice(), goodsPutRequest.getPhotoPath(), goodsPutRequest.getDescription(),
//                    goodsPutRequest.getCategory(), goodsPutRequest.getIsSell(), goodsPutRequest.getEvent(), goodsPutRequest.getHit(),
//                    goodsPutRequest.getConvinence());
            return goodsRepository.save(goods);
//            return true;
        }
//        return false;
        return null;
    }
}
