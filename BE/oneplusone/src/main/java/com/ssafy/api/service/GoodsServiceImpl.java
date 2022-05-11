package com.ssafy.api.service;

import com.ssafy.api.dto.GoodsDto;
import com.ssafy.db.entity.Convinence;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        String convinenceName = goodsEventGetRequest.getConvinenceName();
        StringTokenizer tk = new StringTokenizer(convinenceName,"_");
        List<Goods> list = new ArrayList<Goods>();
        String event = goodsEventGetRequest.getEvent();
        StringTokenizer tkevent = new StringTokenizer(event,"_");
        String goodsName = goodsEventGetRequest.getGoods();
        ArrayList<String> e = new ArrayList<>();
        ArrayList<String> c = new ArrayList<>();
        int size = tk.countTokens();
        for(int i = 0; i < size;i++){
            c.add(tk.nextToken());
        }
        if(convinenceName.equals("all")){
            if(event.equals("0")) {
                if (goodsName.equals("0")) {
                    for (int i = 0; i < size; i++) {
                        list.addAll(goodsRepository.findAll());
                    }
                }else{
                    for (int i = 0; i < size; i++) {
                        list.addAll(goodsRepository.findByNameContaining(goodsName));
                    }
                }
            }else if(goodsName.equals("0")) {
                int eventSize = tkevent.countTokens();
                for (int i = 0; i < eventSize; i++) {
                    e.add(tkevent.nextToken()); //이벤트 이름들
                }
                for (int i = 0; i < size; i++) {
                    for (int j = 0; j < eventSize; j++) {
                        list.addAll(goodsRepository.findByEvent(Integer.parseInt(e.get(j))));
                    }
                }
            }else{
                int eventSize = tkevent.countTokens();
                for (int i = 0; i < eventSize; i++) {
                    e.add(tkevent.nextToken()); //이벤트 이름들
                }
                for (int i = 0; i < size; i++) {
                    for (int j = 0; j < eventSize; j++) {
                        list.addAll(goodsRepository.findByEventAndNameContaining(Integer.parseInt(e.get(j)), goodsName));
                    }
                }
            }
        }else {
            if (event.equals("0")) {
                if (goodsName.equals("0")) {
                    for (int i = 0; i < size; i++) {
                        list.addAll(goodsRepository.findByConvinence(c.get(i)));
                    }
                } else {
                    for (int i = 0; i < size; i++) {
                        list.addAll(goodsRepository.findByConvinenceAndNameContaining(c.get(i), goodsName));
                    }
                }
            } else if (goodsName.equals("0")) {
                int eventSize = tkevent.countTokens();
                for (int i = 0; i < eventSize; i++) {
                    e.add(tkevent.nextToken()); //이벤트 이름들
                }
                for (int i = 0; i < size; i++) {
                    for (int j = 0; j < eventSize; j++) {
                        list.addAll(goodsRepository.findByConvinenceAndEvent(c.get(i), Integer.parseInt(e.get(j))));
                    }
                }
            } else {
                int eventSize = tkevent.countTokens();
                for (int i = 0; i < eventSize; i++) {
                    e.add(tkevent.nextToken()); //이벤트 이름들
                }
                for (int i = 0; i < size; i++) {
                    for (int j = 0; j < eventSize; j++) {
                        list.addAll(goodsRepository.findByConvinenceAndEventAndNameContaining(c.get(i), Integer.parseInt(e.get(j)), goodsName));
                    }
                }
            }
        }
        return list;
    }
}
