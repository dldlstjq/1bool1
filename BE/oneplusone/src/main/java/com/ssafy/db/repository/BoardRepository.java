package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByPasswordAndId(String password,Long Id);
//    @Query(value = "select b.* from board b  where b.content like '%:content%' or b.title like '%:title%'" ,nativeQuery = true)
    List<Board> findByTitleContainingOrContentContaining(@Param("title") String title, @Param("content") String content);
}
