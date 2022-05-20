package com.ssafy.db.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class RecipeReview extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "recipe_id",nullable = false)
    Recipe recipe;

    @Column(name = "nickname")
    String nickname;

    @Column(name = "password")
    String password;

    @Column(name = "content")
    String content;

    public void update(String nickname,String content, String password) {
        this.content = content;
        this.password = password;
        this.nickname = nickname;
    }


}
