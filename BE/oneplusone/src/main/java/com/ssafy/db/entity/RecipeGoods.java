package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
//@NoArgsConstructor
public class RecipeGoods extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "goods_id",nullable = false)
    Goods goods;

    @ManyToOne
    @JoinColumn(name = "recipe_id",nullable = false)
    Recipe recipe;

//    @Builder
//    public RoomUser(Room room, User user){
//        this.room = room;
//        this.user = user;
//    }
}
