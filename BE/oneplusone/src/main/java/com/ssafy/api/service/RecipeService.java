package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeAll;
import org.springframework.data.domain.Page;
import com.ssafy.db.entity.RecipeGoodsSelect;

import java.util.List;

public interface RecipeService {
    boolean createRecipe(RecipeDto.RecipePostRequest recipePostRequest);

    Page<Recipe> findRecipe(Integer page, Integer size);

    List<RecipeAll> findBySearchRecipe(String search);

    Recipe findRecipeDetail(Long id);

    public List<RecipeGoodsSelect> findRecipeDetailGoods(Long id);

    boolean modifyRecipe(RecipeDto.RecipePutRequest recipePutRequest);

    boolean removeRecipe(RecipeDto.RecipeDeleteRequest dto);

    List<Recipe> findRecipePrice(Integer order);

    List<RecipeAll> findRecipeAll();
}
