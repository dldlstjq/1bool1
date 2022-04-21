package com.ssafy.db.repository;

import com.ssafy.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
//    @Query(value = "select * from comment c where c.board_id = :boardId", nativeQuery = true)
    public List<Comment> findByBoardId(Long boardId);

    Comment findByBoardIdAndId(Long boardId, Long id);

    Comment findByBoardIdAndIdAndPassword(Long boardId, Long id, String password);
}
