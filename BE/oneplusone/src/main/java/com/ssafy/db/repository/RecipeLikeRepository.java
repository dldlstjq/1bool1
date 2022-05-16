package com.ssafy.db.repository;

import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeLike;
import com.ssafy.db.entity.RecipeLikeManagement;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeLikeRepository extends JpaRepository<RecipeLikeManagement,Long> {
    @Query(value = "select count(b.id) from recipe_like_management b where b.recipe_id = :Id And b.is_liked = 1",nativeQuery = true)
    Long findBySQL(@Param("Id") Long Id);
    @Query(value = "select b.recipe_id,count(*) as cnt from recipe_like_management b WHERE b.is_liked = 1 group by b.recipe_id order by cnt desc;",nativeQuery = true)
    List<RecipeLike> findAllOrderBySQL();

    RecipeLikeManagement findByRecipeAndUser(Recipe recipe, User user);

    RecipeLikeManagement findByRecipeIdAndUserId(Long recipeId, Long userId);

    @Query(value = "select r.recipe_id,COUNT(r.recipe_id) AS cnt from recipe_like_management r WHERE r.created_date > date_add(now(),interval -7 DAY) AND r.is_liked = 1 GROUP BY r.recipe_id ORDER BY cnt desc LIMIT 10;",nativeQuery = true)
    List<RecipeLike> findRecipeLikeOrderBySQL();

}
