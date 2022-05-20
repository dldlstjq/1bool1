package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Getter
@Setter
//@NoArgsConstructor
public class RecipeGoods extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "goods_id",nullable = false)
    Goods Goods;

    @ManyToOne
    @JoinColumn(name = "recipe_id",nullable = false)
    Recipe recipe;

    public void update(Goods goods,Recipe recipe) {
        this.Goods = goods;
        this.recipe = recipe;
    }

}
