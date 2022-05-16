package com.ssafy.db.repository;

import com.ssafy.api.dto.RecipeDto;
import com.ssafy.db.entity.Recipe;
import com.ssafy.db.entity.RecipeGoods;
import com.ssafy.db.entity.RecipeGoodsSelect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeGoodsRepository extends JpaRepository<RecipeGoods,Long> {


    List<RecipeGoods> findByRecipe(Recipe recipe);

    @Query(value = "select g.photo_path as goods_photo ,r.recipe_id as recipe_id, g.name as name  from recipe_goods r join goods g on g.id = r.goods_id where r.recipe_id = :Id",nativeQuery = true)
    List<RecipeGoodsSelect> findBySQL(@Param("Id") Long Id);
}
