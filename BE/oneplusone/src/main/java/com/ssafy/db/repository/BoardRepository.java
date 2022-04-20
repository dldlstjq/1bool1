package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByPasswordAndId(String password,Long Id);
}
