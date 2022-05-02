package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public List<GoodsDto.GoodsPutRequest> findTop10HitGoods() {
        List<Goods> list = goodsRepository.findTop10ByOrderByHitDesc();

        List<GoodsDto.GoodsPutRequest> hitList = new ArrayList<>();

        for(int i=0; i<list.size(); ++i){
            Goods goods = list.get(i);

            if(goods.getHit() == null) continue;
            GoodsDto.GoodsPutRequest tmp = new GoodsDto.GoodsPutRequest(
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
            hitList.add(tmp);
        }
        return hitList;
//        return goodsRepository.findTop10ByOrderByHitDesc();
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

    @Override
    public List<Goods> findGoodsByConvinenceEvent(GoodsDto.GoodsEventGetRequest goodsEventGetRequest){
        String convinenceName = goodsEventGetRequest.getConvinenceName();
        Long event = goodsEventGetRequest.getEvent();
        return goodsRepository.findGoodsEventByConvinence(convinenceName, event);
    }
}
