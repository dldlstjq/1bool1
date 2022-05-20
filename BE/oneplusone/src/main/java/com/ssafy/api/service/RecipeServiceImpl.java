package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.GoodsRepository;
import com.ssafy.db.repository.RecipeGoodsRepository;
import com.ssafy.db.repository.RecipeLikeRepository;
import com.ssafy.db.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RecipeServiceImpl implements RecipeService{
    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    GoodsRepository goodsRepository;

    @Autowired
    RecipeGoodsRepository recipeGoodsRepository;
    @Override
    @Transactional
    public boolean createRecipe(RecipeDto.RecipePostRequest recipePostRequest) {
        Recipe recipe = new Recipe();
        recipe.setNickname(recipePostRequest.getNickname());
        recipe.setPassword(recipePostRequest.getPassword());
        recipe.setContent(recipePostRequest.getContent());
        recipe.setPhoto(recipePostRequest.getPhoto());
        recipe.setTitle(recipePostRequest.getTitle());
        recipe.setDescription(recipePostRequest.getDescription());
        recipe.setMinute(recipePostRequest.getMinute());
        recipe.setStar(recipePostRequest.getStar());
        recipe.setPrice(recipePostRequest.getPrice());
        List<String> list = Arrays.asList(recipePostRequest.getGoodsId().split(","));

        recipeRepository.save(recipe);
        RecipeGoods recipeGoods;
        for(int i = 0; i < list.size(); i++) {
            recipeGoods = new RecipeGoods();
            Goods goods = goodsRepository.findById(Long.valueOf(list.get(i))).orElseGet(() -> null);
            if(goods == null){
                return false;
            }
            recipeGoods.setGoods(goods);
            recipeGoods.setRecipe(recipe);
            recipeGoodsRepository.save(recipeGoods); //등록
        }
        return true;
    }

    @Override
    public Page<Recipe> findRecipe(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").ascending());
        return recipeRepository.findAll(pageRequest);
    }



    @Override
    public List<RecipeAll> findBySearchRecipe(String search) {
        String temp = "%" + search + "%";

        return recipeRepository.findByTitleContainingOrContentContaining(temp,temp);
    }

    @Override
    public Recipe findRecipeDetail(Long id) {
        return recipeRepository.findById(id).orElseGet(() -> null);
    }

    public List<RecipeGoodsSelect> findRecipeDetailGoods(Long id){
        return recipeGoodsRepository.findBySQL(id);
    }

    @Override
    @Transactional
    public boolean modifyRecipe(RecipeDto.RecipePutRequest recipePutRequest) {
        Recipe recipe = recipeRepository.findByPasswordAndId(recipePutRequest.getPassword(),recipePutRequest.getId()).orElseGet(() -> null);
        List<String> list = Arrays.asList(recipePutRequest.getGoodsId().split(","));

        List<RecipeGoods> recipelist = recipeGoodsRepository.findByRecipe(recipe);
        if(recipelist.size() > 0) {
            for(int j = 0; j < recipelist.size(); j++) {
                recipeGoodsRepository.delete(recipelist.get(j));
            }
        }
        if(!recipePutRequest.getGoodsId().equals("0")) {
            for (int i = 0; i < list.size(); i++) {
                RecipeGoods recipeGoods = new RecipeGoods();
                Goods goods = goodsRepository.findById(Long.valueOf(list.get(i))).orElseGet(() -> null);
                if (goods == null) {
                    return false;
                }
                recipeGoods.setRecipe(recipe);
                recipeGoods.setGoods(goods);
                recipeGoodsRepository.save(recipeGoods);
            }
        }
        if(recipe != null) {
            recipe.setPassword(recipePutRequest.getPassword());
            recipe.setNickname(recipePutRequest.getNickname());
            recipe.setTitle(recipePutRequest.getTitle());
            recipe.setContent(recipePutRequest.getContent());
            recipe.setPhoto(recipePutRequest.getPhoto());
            recipe.setStar(recipePutRequest.getStar());
            recipe.setDescription(recipePutRequest.getDescription());
            recipe.setMinute(recipePutRequest.getMinute());
            recipe.setPrice(recipePutRequest.getPrice());
            Date date = new Date();
            recipe.update(recipePutRequest.getTitle(), recipePutRequest.getContent(),recipePutRequest.getPassword() , recipePutRequest.getPhoto(), recipePutRequest.getNickname(),recipePutRequest.getDescription(), recipePutRequest.getMinute(), recipePutRequest.getStar(),recipePutRequest.getPrice());
            return true;
        }
        return false;

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean removeRecipe(RecipeDto.RecipeDeleteRequest dto) {
        Recipe recipe = recipeRepository.findByPasswordAndIdAndNickname(dto.getPassword(), dto.getId(), dto.getNickname()).orElseGet(() -> null);
        if(recipe != null)
        {
            recipeRepository.deleteById(dto.getId());
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public List<Recipe> findRecipePrice(Integer order) {
        if(order == 1) {
            return recipeRepository.findAll(Sort.by(Sort.Direction.DESC, "price"));
        }else{
            return recipeRepository.findAll(Sort.by(Sort.Direction.ASC,"price"));
        }
    }

    @Override
    public List<RecipeAll> findRecipeAll() {
        List<RecipeAll> list = recipeRepository.findAllJoin();
        Collections.sort(list, new Comparator<RecipeAll>() {
            @Override
            public int compare(RecipeAll s1, RecipeAll s2) {
                if (s1.getId() < s2.getId()) {
                    return 1;
                } else if (s1.getId() > s2.getId()) {
                    return -1;
                }
                return 0;
            }
        });
        return list;
    }
}
