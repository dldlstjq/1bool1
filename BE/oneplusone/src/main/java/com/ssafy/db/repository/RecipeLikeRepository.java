package com.ssafy.db.repository;

import com.ssafy.db.entity.*;
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

    @Query(value = "select r.recipe_id,COUNT(r.recipe_id) AS cnt from recipe_like_management r WHERE r.is_liked = 1 GROUP BY r.recipe_id ORDER BY cnt desc LIMIT 4;",nativeQuery = true)
    List<RecipeLike> findRecipeLikeOrderBySQLTop4();

    @Query(value = "select r.id, r.nickname, r.description, r.title, rl.cnt from recipe as r " +
            "inner join (select rl.recipe_id, count(rl.recipe_id) as cnt " +
            "from recipe_like_management as rl  where rl.is_liked = 1 group by recipe_id limit 4) as rl " +
            "on r.id = rl.recipe_id;",nativeQuery = true)
    List<RecipeKakao> findRecipeLikeOrderBySQLTop4ForKaKao();

    @Query(value = "SELECT r.* FROM recipe_like_management r WHERE r.user_id = :userId AND r.is_liked = 1 ",nativeQuery = true)
    List<RecipeLikeManagement> findByUserId(@Param("userId") Long userId);
}
