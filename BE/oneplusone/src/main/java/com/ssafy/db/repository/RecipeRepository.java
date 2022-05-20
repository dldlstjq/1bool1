package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeAll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe,Long> {
    Optional<Recipe> findByPasswordAndId(String password, Long Id);
    @Query(value = "SELECT (SELECT COUNT(m.id) FROM recipe_like_management m WHERE m.is_liked = 1 AND m.recipe_id = r.id) as cnt,r.id,r.created_date,r.modified_date,r.content,r.description,r.minute,r.nickname,r.password,r.photo,r.star,r.title,r.price FROM recipe r WHERE r.title LIKE :title OR r.content LIKE :content",nativeQuery = true)
    List<RecipeAll> findByTitleContainingOrContentContaining(@Param("title") String title, @Param("content") String content);

    Optional<Recipe> findByPasswordAndIdAndNickname(String password, Long Id, String nickname);

    @Query(value = "SELECT (SELECT count(m.id) FROM recipe_like_management m WHERE m.recipe_id = r.id AND m.is_liked = 1) AS cnt ,r.id,r.created_date,r.modified_date,r.content,r.description,r.minute,r.nickname,r.password,r.photo,r.star,r.title,r.price FROM recipe r;",nativeQuery = true)
    List<RecipeAll> findAllJoin();
}
