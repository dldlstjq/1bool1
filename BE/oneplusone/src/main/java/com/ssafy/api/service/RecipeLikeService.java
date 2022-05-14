package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;

import java.util.List;

public interface RecipeLikeService {
    Long findByRecipeId(RecipeDto.RecipeLikeGetRequest dto);

    List<RecipeDto.RecipeLikeGet> findByRecipe();

    boolean modifyRecipeLike(RecipeDto.RecipeLikeGetRequest dto);
}
