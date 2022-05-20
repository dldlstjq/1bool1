package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeReviewDto;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.GoodsReview;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeReview;
import com.ssafy.db.repository.RecipeReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class RecipeReviewServiceImpl implements RecipeReviewService{
    @Autowired
    RecipeReviewRepository recipeReviewRepository;
    @Override
    public List<RecipeReview> findRecipeReview(Long recipeId) {
        return recipeReviewRepository.findByRecipeId(recipeId);
    }

    @Override
    @Transactional
    public RecipeReview createRecipeReview(RecipeReviewDto.RecipeReviewPostRequest recipeReviewPostRequest) {
        RecipeReview recipeReview = new RecipeReview();
        Recipe recipe = new Recipe();
        recipe.setId(recipeReviewPostRequest.getRecipeId());
        recipeReview.setContent(recipeReviewPostRequest.getContent());
        recipeReview.setRecipe(recipe);
        recipeReview.setPassword(recipeReviewPostRequest.getPassword());
        recipeReview.setNickname(recipeReviewPostRequest.getNickname());
        return recipeReviewRepository.save(recipeReview);
    }

    @Override
    @Transactional
    public boolean modifyRecipeReview(RecipeReviewDto.RecipeReviewPutRequest dto) {
        RecipeReview recipeReview;
        recipeReview = recipeReviewRepository.findByRecipeIdAndIdAndPassword(dto.getRecipeId(),dto.getId(),dto.getPassword());
        if(recipeReview == null){
            return false;
        }else {

            recipeReview.update(dto.getNickname(), dto.getContent(), dto.getPassword());
            return true;
        }
    }

    @Override
    @Transactional
    public boolean removeRecipeReview(RecipeReviewDto.RecipeReviewDeleteRequest dto) {
        RecipeReview recipeReview;
        recipeReview = recipeReviewRepository.findByRecipeIdAndIdAndPassword(dto.getRecipeId(),dto.getId(),dto.getPassword());
        if(recipeReview == null){
            return false;
        }else {
            recipeReviewRepository.delete(recipeReview);
            return true;
        }
    }
}
