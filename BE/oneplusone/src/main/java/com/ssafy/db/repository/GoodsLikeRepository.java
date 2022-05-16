package com.ssafy.db.repository;

import com.ssafy.db.entity.*;
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

    @Query(value = "select g.name, g.photo_path, g.price, g.event, g.convinence from goods as g" +
            " inner join (select goods_id from goods_user_management as gu" +
            " inner join user as u on gu.user_id = u.id where u.email=:friendId)" +
            " as gi on g.id = gi.goods_id where g.is_sell = 1;",nativeQuery = true)
    List<GoodsLike2> findUserLikeGoods(Long friendId);
}
