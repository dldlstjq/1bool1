package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeGoodsSelect;

import java.util.List;

public interface RecipeService {
    boolean createRecipe(RecipeDto.RecipePostRequest recipePostRequest);

    List<Recipe> findRecipe();

    List<Recipe> findBySearchRecipe(String search);

    Recipe findRecipeDetail(Long id);

    public List<RecipeGoodsSelect> findRecipeDetailGoods(Long id);

    boolean modifyRecipe(RecipeDto.RecipePutRequest recipePutRequest);

    boolean removeRecipe(Long id);
}
