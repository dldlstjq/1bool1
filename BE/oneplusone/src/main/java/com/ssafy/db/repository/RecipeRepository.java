package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe,Long> {
    Optional<Recipe> findByPasswordAndId(String password, Long Id);
    List<Recipe> findByTitleContainingOrContentContaining(String title, String content);

    Optional<Recipe> findByPasswordAndIdAndNickname(String password, Long Id, String nickname);
}
