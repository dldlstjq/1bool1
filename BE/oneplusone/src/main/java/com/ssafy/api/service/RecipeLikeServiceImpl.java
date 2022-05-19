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
import java.util.StringTokenizer;

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
    public List<RecipeDto.RecipeLikeGet> findByRecipe() {
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
        RecipeDto.RecipeLikeGetOrderBy t;
        for(int i = 0; i < another.size(); i++){
            t = new RecipeDto.RecipeLikeGetOrderBy();
            t.setRecipe(another.get(i));
            t.setCnt(0L);
            newOne.add(t);
        }

        List<RecipeDto.RecipeLikeGet> ans = new ArrayList<>();
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
            test.setPrice(newOne.get(i).getRecipe().getPrice());
            ans.add(test);
        }
        return ans;
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

    @Override
    public boolean findLike(RecipeDto.RecipeLikeGetRequest dto) {

        Recipe recipe = recipeRepository.findById(dto.getId()).orElseGet(() -> null);
        User user = userRepository.findById(dto.getUserId()).orElseGet(()->null);
        RecipeLikeManagement recipeLike = recipeLikeRepository.findByRecipeAndUser(recipe,user);
        if(recipeLike == null){
            return false;
        }else {
            if(recipeLike.getIsLiked() == 0){
                return false;
            }
            return true;
        }
    }

    @Override
    public List<RecipeDto.RecipeLikeGet> findByRecipeWeek() {
        List<RecipeLike> list = recipeLikeRepository.findRecipeLikeOrderBySQL();
        List<RecipeDto.RecipeLikeGet> ans = new ArrayList<>();
        if(list.size() == 0){
            return new ArrayList<>();
        }else{

            RecipeDto.RecipeLikeGet recipeLikeGet;
            Recipe recipe;
            StringTokenizer tk;
            for(int i = 0; i < list.size(); i++){
                recipeLikeGet = new RecipeDto.RecipeLikeGet();
                recipe = recipeRepository.findById(list.get(i).getRecipe_id()).orElseGet(() -> null);
                tk = new StringTokenizer(recipe.getPhoto(),",");
                recipeLikeGet.setCnt(list.get(i).getCnt());
                recipeLikeGet.setStar(recipe.getStar());
                recipeLikeGet.setMinute(recipe.getMinute());
                recipeLikeGet.setDescription(recipe.getDescription());
                recipeLikeGet.setPhoto(tk.nextToken());
                recipeLikeGet.setPassword(recipe.getPassword());
                recipeLikeGet.setContent(recipe.getContent());
                recipeLikeGet.setNickname(recipe.getNickname());
                recipeLikeGet.setTitle(recipe.getTitle());
                recipeLikeGet.setId(recipe.getId());
                recipeLikeGet.setModifiedDate(recipe.getModifiedDate());
                recipeLikeGet.setCreatedDate(recipe.getCreatedDate());
                recipeLikeGet.setPrice(recipe.getPrice());
                ans.add(recipeLikeGet);
            }
        }
        return ans;
    }

    @Override
    public List<Recipe> findRecipeLike(Long userId) {
        List<RecipeLikeManagement> recipes = recipeLikeRepository.findByUserId(userId);
        List<Recipe> list = new ArrayList<>();
        for(int i = 0; i < recipes.size(); i++){
            list.add(recipeRepository.findById(recipes.get(i).getRecipe().getId()).orElseGet(()->null));
        }
        return list;
    }

    @Override
    public List<RecipeDto.RecipeLikeGet> findByRecipeTop() {
        List<RecipeLike> list = recipeLikeRepository.findRecipeLikeOrderBySQLTop4();
        List<RecipeDto.RecipeLikeGet> ans = new ArrayList<>();
        if(list.size() == 0){
            return new ArrayList<>();
        }else{

            RecipeDto.RecipeLikeGet recipeLikeGet;
            Recipe recipe;
            StringTokenizer tk;
            for(int i = 0; i < list.size(); i++){
                recipeLikeGet = new RecipeDto.RecipeLikeGet();
                recipe = recipeRepository.findById(list.get(i).getRecipe_id()).orElseGet(() -> null);
                tk = new StringTokenizer(recipe.getPhoto(),",");
                recipeLikeGet.setCnt(list.get(i).getCnt());
                recipeLikeGet.setStar(recipe.getStar());
                recipeLikeGet.setMinute(recipe.getMinute());
                recipeLikeGet.setDescription(recipe.getDescription());
                recipeLikeGet.setPhoto(tk.nextToken());
                recipeLikeGet.setPassword(recipe.getPassword());
                recipeLikeGet.setContent(recipe.getContent());
                recipeLikeGet.setNickname(recipe.getNickname());
                recipeLikeGet.setTitle(recipe.getTitle());
                recipeLikeGet.setId(recipe.getId());
                recipeLikeGet.setPrice(recipe.getPrice());
                recipeLikeGet.setModifiedDate(recipe.getModifiedDate());
                recipeLikeGet.setCreatedDate(recipe.getCreatedDate());
                ans.add(recipeLikeGet);
            }
        }
        return ans;
    }
}
