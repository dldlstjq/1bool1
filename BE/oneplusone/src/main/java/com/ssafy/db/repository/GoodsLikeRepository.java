package com.ssafy.db.repository;

import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.GoodsLike;
import com.ssafy.db.entity.GoodsUserManagement;
import com.ssafy.db.entity.User;
import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsLikeRepository extends JpaRepository<GoodsUserManagement, Long> {
    GoodsUserManagement findByGoodsAndUser(Goods goods, User user);

    @Query(value="select b.goods_id, count(*) as likeCnt from goods_user_management b\n" +
            "group by b.goods_id\n" +
            "order by likeCnt desc", nativeQuery = true)
    List<GoodsLike> findAllOrderBySQL();

    @Query(value="select b.goods_id, count(*) as likeCnt from goods_user_management b\n" +
            "WHERE b.goods_id = :goodsId", nativeQuery = true)
    GoodsLike findBySQLDetail(@Param("goodsId") Long goodsId);


}
