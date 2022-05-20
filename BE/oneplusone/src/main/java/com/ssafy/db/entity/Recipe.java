package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Recipe extends BaseEntity{

    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "content", length = 5000)
    String content;

    @Column(name = "photo", length = 10000)
    String photo;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "nickname", nullable = false)
    String nickname;

    @Column(name = "description")
    String description;

    @Column(name = "minute")
    Integer minute;

    @Column(name = "star")
    Integer star;
    @Column(name = "price")
    Long price;

    public void update(String title, String content, String password,String photo,String nickname,String description,Integer minute,Integer star,Long price) {
        this.title = title;
        this.content = content;
        this.password = password;
        this.photo = photo;
        this.nickname = nickname;
        this.description = description;
        this.minute = minute;
        this.star = star;
        this.price = price;
    }

    @Builder
    public Recipe(Long id, String title, String content,String photo, String password, String nickname,String description,Integer minute,Integer star,Long price){
        this.id = id;
        this.title = title;
        this.content = content;
        this.photo = photo;
        this.password = password;
        this.nickname = nickname;
        this.description = description;
        this.minute = minute;
        this.star = star;
        this.price = price;
    }

}
