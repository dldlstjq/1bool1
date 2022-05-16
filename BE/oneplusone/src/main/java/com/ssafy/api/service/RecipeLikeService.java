package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RecipeLikeService {
    Long findByRecipeId(RecipeDto.RecipeLikeGetRequest dto);

    Page<RecipeDto.RecipeLikeGet> findByRecipe(Integer page, Integer size, Pageable pageable);

    boolean modifyRecipeLike(RecipeDto.RecipeLikeGetRequest dto);

    boolean findLike(RecipeDto.RecipeLikeGetRequest dto);
}
