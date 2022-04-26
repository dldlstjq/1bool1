package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.GoodsUserManagement;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.GoodsLikeRepository;
import com.ssafy.db.repository.GoodsRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class GoodsLikeServiceImpl implements GoodsLikeService{

    @Autowired
    private GoodsLikeRepository goodsLikeRepository;
    @Autowired
    private GoodsRepository goodsRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public boolean modifyGoodsLike(GoodsDto.GoodsLikeGetRequest dto){
        Goods goods = goodsRepository.findById(dto.getId()).orElseGet(()->null);
        if (goods==null){
            return false;
        }

        User user = userRepository.findById(dto.getUserId()).orElseGet(()->null);
        if(user==null)
            return false;

        GoodsUserManagement goodsUser = goodsLikeRepository.findByGoodsAndUser(goods, user);
        if(goodsUser==null){
            goodsUser = new GoodsUserManagement();
            goodsUser.setGoods(goods);
            goodsUser.setUser(user);
            goodsUser.setIsLiked(1);
            goodsLikeRepository.save(goodsUser);
            return true;
        }
        goodsUser.update(0);
        return true;


    }

}
