package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeReviewDto;
import com.ssafy.db.entity.RecipeReview;
import com.ssafy.db.repository.GoodsReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface RecipeReviewService {


    List<RecipeReview> findRecipeReview(Long recipeId);

    RecipeReview createRecipeReview(RecipeReviewDto.RecipeReviewPostRequest recipeReviewPostRequest);

    boolean modifyRecipeReview(RecipeReviewDto.RecipeReviewPutRequest dto);

    boolean removeRecipeReview(RecipeReviewDto.RecipeReviewDeleteRequest dto);
}
