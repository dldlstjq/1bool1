package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.GoodsLikeRepository;
import com.ssafy.db.repository.GoodsRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
            if(goodsLike.getIsLiked() == 0){
                return false;
            }
            return true;
        }

    }

    @Override
    public GoodsDto.GoodsLikeDetail findLikeGoods(Long goodsId) {
        GoodsLike goodsLike = goodsLikeRepository.findBySQLDetail(goodsId);
        if(goodsLike == null){
            return null;
        }else{
            Goods goods = goodsRepository.findById(goodsLike.getGoods_id()).orElseGet(()->null);
            GoodsDto.GoodsLikeDetail dto = new GoodsDto.GoodsLikeDetail();
            dto.setCategory(goods.getCategory());
            dto.setId(goods.getId());
            dto.setCnt(goodsLike.getLikeCnt());
            dto.setConvinence(goods.getConvinence());
            dto.setDescription(goods.getDescription());
            dto.setEvent(goods.getEvent());
            dto.setCreatedDate(goods.getCreatedDate());
            dto.setHit(goods.getHit());
            dto.setIsSell(goods.getIsSell());
            dto.setModifiedDate(goods.getModifiedDate());
            dto.setName(goods.getName());
            dto.setPhotoPath(goods.getPhotoPath());
            dto.setPrice(goods.getPrice());
            dto.setStartDate(goods.getStartDate());
            dto.setUpdateDate(goods.getUpdateDate());
            return dto;
        }
    }

    @Override
    public List<Goods> findGoodsLike(Long userId) {
        List<GoodsUserManagement> goods = goodsLikeRepository.findByUserId(userId);
        List<Goods> list = new ArrayList<>();
        for(int i = 0; i < goods.size(); i++){
            if(goods.get(i).getIsLiked() == 0){
                continue;
            }
            list.add(goodsRepository.findById(goods.get(i).getGoods().getId()).orElseGet(()->null));
        }
        Collections.sort(list,new Comparator<Goods>() {
            @Override
            public int compare(Goods s1, Goods s2) {
                if (s1.getId() < s2.getId()) {
                    return 1;
                } else if (s1.getId() > s2.getId()) {
                    return -1;
                }
                return 0;
            }
        });
        return list;

    }

}
