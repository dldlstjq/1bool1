package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RecipeLikeService {
    Long findByRecipeId(RecipeDto.RecipeLikeGetRequest dto);

    List<RecipeDto.RecipeLikeGet> findByRecipe();

    boolean modifyRecipeLike(RecipeDto.RecipeLikeGetRequest dto);

    boolean findLike(RecipeDto.RecipeLikeGetRequest dto);

    List<RecipeDto.RecipeLikeGet> findByRecipeWeek();

    List<Recipe> findRecipeLike(Long userId);

    List<RecipeDto.RecipeLikeGet> findByRecipeTop();
}
