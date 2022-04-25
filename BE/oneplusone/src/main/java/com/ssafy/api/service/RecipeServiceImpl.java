package com.ssafy.api.service;

import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService{
    @Autowired
    RecipeRepository recipeRepository;

    @Override
    @Transactional
    public Recipe createRecipe(RecipeDto.RecipePostRequest recipePostRequest) {
        Recipe recipe = new Recipe();
        recipe.setNickname(recipePostRequest.getNickname());
        recipe.setPassword(recipePostRequest.getPassword());
        recipe.setContent(recipePostRequest.getContent());
        recipe.setPhoto(recipePostRequest.getPhoto());
        recipe.setTitle(recipePostRequest.getTitle());
        Date date = new Date();
//        recipePostRequest.setStartDate(date);
//        recipe.setStartDate(recipePostRequest.getStartDate());
        return recipeRepository.save(recipe);
    }

    @Override
    public Page<Recipe> findRecipe(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());
        return recipeRepository.findAll(pageRequest);
    }

    @Override
    public List<Recipe> findBySearchRecipe(String search) {
        return recipeRepository.findByTitleOrContent(search,search).orElseGet(() -> null);
    }

    @Override
    public Recipe findRecipeDetail(Long id) {
        return recipeRepository.findById(id).orElseGet(() -> null);
    }

    @Override
    @Transactional
    public boolean modifyRecipe(RecipeDto.RecipePutRequest recipePutRequest) {
        Recipe recipe = recipeRepository.findByPasswordAndId(recipePutRequest.getPassword(),recipePutRequest.getId()).orElseGet(() -> null);
        if(recipe != null) {
            recipe.setPassword(recipePutRequest.getPassword());
            recipe.setNickname(recipePutRequest.getNickname());
            recipe.setTitle(recipePutRequest.getTitle());
            recipe.setContent(recipePutRequest.getContent());
            recipe.setPhoto(recipePutRequest.getPhoto());
            Date date = new Date();
//            recipe.setStartDate(date);
            recipe.update(recipePutRequest.getTitle(), recipePutRequest.getContent(),recipePutRequest.getPassword() , recipePutRequest.getPhoto(), recipePutRequest.getNickname());
//            recipe.update(recipePutRequest.getTitle(), recipePutRequest.getContent(),recipePutRequest.getPassword() ,recipePutRequest.getUpdateDate(), recipePutRequest.getPhoto(), recipePutRequest.getNickname());
            return true;
        }
        return false;

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean removeRecipe(Long id) {
        recipeRepository.deleteById(id);
        return true;
    }
}
