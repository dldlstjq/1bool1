package com.ssafy.db.repository;

import com.ssafy.db.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
    List<Goods> findTop10ByOrderByUpdateDateDesc();

    List<Goods> findTop10ByOrderByHitDesc();

    @Query(value = "select * from goods as g where g.convinence = :convinenceName and g.event = :event", nativeQuery = true)
    List<Goods> findGoodsEventByConvinence(String convinenceName, Long event);

    List<Goods> findByNameContaining(String name);

    List<Goods> findByConvinenceContaining(String convienence);

//    List<Goods> findTop10ByOrderByLikeDesc();
//@Query(value = "select * from room as ru where ru.room_id IN ( select r.room_id from room_user as r where r.user_id = :userId )", nativeQuery = true)
//List<Room> searchUserHasRoom(Long userId);
}
