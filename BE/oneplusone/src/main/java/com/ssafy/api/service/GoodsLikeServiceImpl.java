package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.GoodsLikeRepository;
import com.ssafy.db.repository.GoodsRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


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

    @Override
    public List<GoodsDto.GoodsLikeGetOrderBy> findTop10LikeGoods(){
        List<GoodsLike> list= goodsLikeRepository.findAllOrderBySQL();

        List<GoodsDto.GoodsLikeGetOrderBy> goods = new ArrayList<>();
//        List<Goods> tmp = new ArrayList<>();

        if(list==null || list.isEmpty()) return null;

        int cnt = 0;
        GoodsDto.GoodsLikeGetOrderBy tmp;
        for(int i=0; i<list.size(); ++i){
            if(cnt==10) break;  // 10개 상품까지만 저장

            tmp = new GoodsDto.GoodsLikeGetOrderBy();

            Long id = list.get(i).getGoods_id();
            Long likeCnt = list.get(i).getLikeCnt();
            System.out.println(likeCnt);
            tmp.setGoods(goodsRepository.findById(id).orElseGet(()->null));
            tmp.setCnt(likeCnt);

            goods.add(tmp);
            cnt++;
        }
        return goods;
    }

    @Override
    public boolean findLike(GoodsDto.GoodsLikeGetRequest dto) {
        Goods goods = goodsRepository.findById(dto.getId()).orElseGet(() -> null);
        User user = userRepository.findById(dto.getUserId()).orElseGet(()->null);
        GoodsUserManagement goodsLike = goodsLikeRepository.findByGoodsAndUser(goods,user);
        if(goodsLike == null){
            return false;
        }else {
            return true;
        }

    }

}
