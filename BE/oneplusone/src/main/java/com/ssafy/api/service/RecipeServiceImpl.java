package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.Goods;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeGoods;
import com.ssafy.db.entity.RecipeGoodsSelect;
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

import java.util.Arrays;
import java.util.Date;
import java.util.List;

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
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());
        return recipeRepository.findAll(pageRequest);
    }



    @Override
    public List<Recipe> findBySearchRecipe(String search) {
        return recipeRepository.findByTitleContainingOrContentContaining(search,search);
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
            for(int j = 0; j < recipelist.size(); j++) { //레시피 아이디로 등록 된 것 다 지우고
                recipeGoodsRepository.delete(recipelist.get(j));
            }
        }
        if(!recipePutRequest.getGoodsId().equals("0")) {
            for (int i = 0; i < list.size(); i++) {
                RecipeGoods recipeGoods = new RecipeGoods();
                Goods goods = goodsRepository.findById(Long.valueOf(list.get(i))).orElseGet(() -> null);
                if (goods == null) { //goods 가 없는 번호
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
            Date date = new Date();
//            recipe.setStartDate(date);
            recipe.update(recipePutRequest.getTitle(), recipePutRequest.getContent(),recipePutRequest.getPassword() , recipePutRequest.getPhoto(), recipePutRequest.getNickname(),recipePutRequest.getDescription(), recipePutRequest.getMinute(), recipePutRequest.getStar());
//            recipe.update(recipePutRequest.getTitle(), recipePutRequest.getContent(),recipePutRequest.getPassword() ,recipePutRequest.getUpdateDate(), recipePutRequest.getPhoto(), recipePutRequest.getNickname());
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
}
