package com.ssafy.db.repository;

import com.ssafy.db.entity.RecipeReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeReviewRepository extends JpaRepository<RecipeReview,Long> {
    List<RecipeReview> findByRecipeId(Long recipeId);

    RecipeReview findByRecipeIdAndIdAndPassword(Long recipeId, Long id, String password);
}
