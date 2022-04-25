package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class RecipeLikeManagement extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "recipe_id",nullable = false)
    Recipe recipe;

    @Column(name = "isLiked")
    Integer isLiked;

    public void update(Integer isLiked) {
        if(this.isLiked == isLiked) {
            this.isLiked = 1;
        }else{
            this.isLiked = 0;
        }

    }
}
