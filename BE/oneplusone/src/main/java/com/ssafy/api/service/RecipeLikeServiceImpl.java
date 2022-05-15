package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.RecipeLikeRepository;
import com.ssafy.db.repository.RecipeRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeLikeServiceImpl implements RecipeLikeService{

    @Autowired
    RecipeLikeRepository recipeLikeRepository;
    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    UserRepository userRepository;
    @Override
    public Long findByRecipeId(RecipeDto.RecipeLikeGetRequest dto) {
        return recipeLikeRepository.findBySQL(dto.getId());
    }

    @Override
    public Page<RecipeDto.RecipeLikeGet> findByRecipe(Integer page, Integer size, Pageable pageable) {
        List<RecipeLike> list = recipeLikeRepository.findAllOrderBySQL();
        List<RecipeDto.RecipeLikeGetOrderBy> newOne = new ArrayList<>();
        RecipeDto.RecipeLikeGetOrderBy temp;
        List<Recipe> another = new ArrayList<>();
        another = recipeRepository.findAll();
        for(int i = 0; i < list.size(); i++){
            temp = new RecipeDto.RecipeLikeGetOrderBy();
            temp.setRecipe(recipeRepository.findById(list.get(i).getRecipe_id()).orElseGet(() -> null));
            temp.setCnt(list.get(i).getCnt());
            another.remove(recipeRepository.findById(list.get(i).getRecipe_id()).orElseGet(() -> null)); //삭제 처리
            newOne.add(temp);
        }
        //이 곳은 레시피 좋아요 갯수를 받지 못한 곳 입니다.
        RecipeDto.RecipeLikeGetOrderBy t;
        for(int i = 0; i < another.size(); i++){
            t = new RecipeDto.RecipeLikeGetOrderBy();
            t.setRecipe(another.get(i));
            t.setCnt(0L);
            newOne.add(t);
        }
        //끝 처리

        List<RecipeDto.RecipeLikeGet> ans = new ArrayList<>();
        //끝 처리
        RecipeDto.RecipeLikeGet test;
        for(int i = 0; i < newOne.size(); i++){
            test = new RecipeDto.RecipeLikeGet();
            test.setId(newOne.get(i).getRecipe().getId());
            test.setCnt(newOne.get(i).getCnt());
            test.setTitle(newOne.get(i).getRecipe().getTitle());
            test.setContent(newOne.get(i).getRecipe().getContent());
            test.setNickname(newOne.get(i).getRecipe().getNickname());
            test.setPassword(newOne.get(i).getRecipe().getPassword());
            test.setPhoto(newOne.get(i).getRecipe().getPhoto());
            test.setCreatedDate(newOne.get(i).getRecipe().getCreatedDate());
            test.setDescription(newOne.get(i).getRecipe().getDescription());
            test.setModifiedDate(newOne.get(i).getRecipe().getModifiedDate());
            test.setStar(newOne.get(i).getRecipe().getStar());
            test.setMinute(newOne.get(i).getRecipe().getMinute());
            ans.add(test);
        }
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), ans.size());
        final Page<RecipeDto.RecipeLikeGet> p = new PageImpl<>(ans.subList(start, end), pageable, ans.size());

        return p;
    }

    @Override
    @Transactional
    public boolean modifyRecipeLike(RecipeDto.RecipeLikeGetRequest dto) {
        Recipe recipe;
        recipe = recipeRepository.findById(dto.getId()).orElseGet(() -> null);

        if(recipe == null){
            return false;
        }
        User user;
        user = userRepository.findById(dto.getUserId()).orElseGet(()->null);
        if(user == null) {
            return false;
        }
        RecipeLikeManagement recipelike;
        recipelike = recipeLikeRepository.findByRecipeAndUser(recipe,user);
        if(recipelike == null){
            recipelike = new RecipeLikeManagement();
            recipelike.setIsLiked(1);
            recipelike.setUser(user);
            recipelike.setRecipe(recipe);
            recipeLikeRepository.save(recipelike);
            return true;
        }
        recipelike.update(0);
        return true;
    }
}
