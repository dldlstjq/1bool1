package com.ssafy.db.repository;

import com.ssafy.db.entity.GoodsReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsReviewRepository extends JpaRepository<GoodsReview,Long> {
    List<GoodsReview> findByGoodsId(Long goodsId);

    GoodsReview findByGoodsIdAndId(Long goodsId, Long id);

    GoodsReview findByGoodsIdAndIdAndPassword(Long goodsId, Long id, String password);
}
