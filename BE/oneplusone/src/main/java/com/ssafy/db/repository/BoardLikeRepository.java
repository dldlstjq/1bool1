package com.ssafy.db.repository;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.BoardLikeManagement;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLikeManagement,Long> {
    @Query(value = "select count(b.id) from board_like_management b where b.board_id = :Id And b.is_liked = 1",nativeQuery = true)
    Long findBySQL(@Param("Id") Long Id);

    BoardLikeManagement findByBoardAndUser(Board board, User user);

    @Query(value = "select b.board_id,count(*) as cnt from board_like_management b group by b.board_id order by b.cnt desc;",nativeQuery = true)
    List<BoardLike> findAllOrderBySQL();
}
