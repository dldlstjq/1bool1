package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByPasswordAndId(String password,Long Id);
    @Query(value = "select b.*,(SELECT count(r.id) FROM board_like_management r WHERE r.is_liked = 1 AND b.id = r.board_id GROUP BY r.board_id ) AS cnt from board b where b.content LIKE :content or b.title like :title" ,nativeQuery = true)
    List<BoardSearch> findByTitleContainingOrContentContaining(@Param("title") String title, @Param("content") String content);
    @Query(value = "SELECT r.*,(SELECT COUNT(l.id) FROM board_like_management l WHERE l.board_id = :Id AND l.is_liked = 1 GROUP BY l.board_id) AS cnt FROM board r WHERE r.id = :Id",nativeQuery = true)
    BoardSearch findByIdSQL(@Param("Id") Long id);
}
