package com.ssafy.db.repository;

import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.GoodsUserManagement;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoodsLikeRepository extends JpaRepository<GoodsUserManagement, Long> {
    GoodsUserManagement findByGoodsAndUser(Goods goods, User user);
}
