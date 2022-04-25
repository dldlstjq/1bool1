package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByPasswordAndId(String password,Long Id);
    Optional<List<Board>> findByTitleOrContent(String title, String content);

//    Page<Board> findByIdOrderByIdDesc(Long id, Pageable pageable);
}
