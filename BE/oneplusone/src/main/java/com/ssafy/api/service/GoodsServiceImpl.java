package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Convinence;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

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
    }


    @Override
    public Goods findGoodsDetail(Long goodsId) {
        return goodsRepository.findById(goodsId).orElseGet(() -> null);
    }

    @Override
    @Transactional
    public Goods modifyGoodsHit(GoodsDto.GoodsPutRequest goodsPutRequest){
        Goods goods = goodsRepository.findById(goodsPutRequest.getId()).orElseGet(()->null);

        if(goods != null){
            goods.setName(goodsPutRequest.getName());
            goods.setPrice(goodsPutRequest.getPrice());
            goods.setPhotoPath(goodsPutRequest.getPhotoPath());
            goods.setDescription(goodsPutRequest.getDescription());
            goods.setEvent(goodsPutRequest.getEvent());
            goods.setIsSell(goodsPutRequest.getIsSell());
            goods.setCategory(goodsPutRequest.getCategory());
            goods.setHit(goodsPutRequest.getHit());
            goods.setConvinence(goodsPutRequest.getConvinence());
            return goodsRepository.save(goods);
        }
        return null;
    }

    @Override
    public List<Goods> findGoods() {
        return goodsRepository.findAll();
    }

    @Override
    public List<Goods> findBySearchGoods(String search) {
        return goodsRepository.findByNameContaining(search);
    }

    @Override
    public List<Goods> findBySearchConGoods(String search) {
        return goodsRepository.findByConvinenceContaining(search);
    }

    @Override
    public List<Convinence> findBySearchCon() {
        return goodsRepository.findByNameSQL();
    }


    @Override
    public List<Goods> findGoodsByConvinenceEvent(GoodsDto.GoodsEventGetRequest goodsEventGetRequest){
        List<Goods> list;
        if(goodsEventGetRequest.getGoods().equals("0")) {
            list = goodsRepository.findAll();
        }
        else{
            list = goodsRepository.findByNameContaining(goodsEventGetRequest.getGoods());
        }
        List<Goods> ans = new ArrayList<Goods>();
        String convinenceName = goodsEventGetRequest.getConvinenceName();
        String event = goodsEventGetRequest.getEvent();
        String goodsName = goodsEventGetRequest.getGoods();
        StringTokenizer tk = new StringTokenizer(convinenceName,"_");
        StringTokenizer tkevent = new StringTokenizer(event,"_");
        int size = tk.countTokens();
        int eventSize = tkevent.countTokens();
        int [] eve = new int[eventSize];
        String[] con = new String[size];
        for(int j = 0; j < eventSize; j++) {
            eve[j] = Integer.parseInt(tkevent.nextToken());
        }
        for(int j = 0; j < size; j++) {
            con[j] = tk.nextToken();
        }


        if(convinenceName.equals("all") && event.equals("0") && goodsName.equals("0")){
            return list;
        }

        if(convinenceName.equals("all") && event.equals("0") && !goodsName.equals("0")){
            return list;
        }

        if(convinenceName.equals("all") && !event.equals("0") && goodsName.equals("0")){
            for(int j = 0; j < eventSize; j++) {
                for (int i = 0; i < list.size(); i++) {
                    if(list.get(i).getEvent() == (eve[j])) {
                        ans.add(list.get(i));
                    }
                }
            }
            return ans;
        }

        if(convinenceName.equals("all") && !event.equals("0") && !goodsName.equals("0")){
            for(int j = 0; j < eventSize; j++) {
                for (int i = 0; i < list.size(); i++) {
                    if(list.get(i).getEvent() == (eve[j]))
                    {
                        ans.add(list.get(i));
                    }
                }
            }
            return ans;
        }

        if(!convinenceName.equals("all") && event.equals("0") && goodsName.equals("0")){
            for(int k = 0; k < size; k++) {
                for (int i = 0; i < list.size(); i++) {
                    if (list.get(i).getConvinence().toUpperCase().equals(con[k].toUpperCase())) {
                        ans.add(list.get(i));
                    }
                }
            }
            return ans;
        }

        if(!convinenceName.equals("all") && !event.equals("0") && goodsName.equals("0")){
            for(int k = 0; k < size; k++) {
                for (int j = 0; j < eventSize; j++) {
                    for (int i = 0; i < list.size(); i++) {
                        if (list.get(i).getEvent() == eve[j] && list.get(i).getConvinence().toUpperCase().equals(con[k].toUpperCase())) {
                            ans.add(list.get(i));
                        }
                    }
                }
            }
            return ans;
        }

        if(!convinenceName.equals("all") && event.equals("0") && !goodsName.equals("0")){
            for(int k = 0; k < size; k++) {
                for (int i = 0; i < list.size(); i++) {
                    if (list.get(i).getConvinence().toUpperCase().equals(con[k].toUpperCase())) {
                        ans.add(list.get(i));
                    }
                }
            }
            return ans;
        }
        if(!convinenceName.equals("all") && !event.equals("0") && !goodsName.equals("0")){
            for(int k = 0; k < size; k++) {
                for (int j = 0; j < eventSize; j++) {
                    for (int i = 0; i < list.size(); i++) {
                        if (list.get(i).getEvent() == eve[j] && list.get(i).getConvinence().toUpperCase().equals(con[k].toUpperCase())) {
                            ans.add(list.get(i));
                        }
                    }
                }
            }
            return ans;
        }
        return list;
    }
}
