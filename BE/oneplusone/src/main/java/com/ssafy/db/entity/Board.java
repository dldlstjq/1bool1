package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board extends BaseEntity{
    @Column(name = "title",nullable = false)
    String title;


    @Column(name = "content",nullable = false)
    String content;


    @Column(name = "photo",length = 10000)
    String photo;


    @Column(name = "password",nullable = false)
    String password;


    @Column(name = "nickname",nullable = false)
    String nickname;

    @Builder
    public Board(Long id){
        this.id = id;
    }

    @Builder
    public Board(Long id, String title, String content,String photo, String password, String nickname){
        this.id = id;
        this.title = title;
        this.content = content;
        this.photo = photo;
        this.password = password;
        this.nickname = nickname;
    }

    public void update(String title, String content, String password,String photo,String nickname) {
        this.title = title;
        this.content = content;
        this.password = password;
        this.photo = photo;
        this.nickname = nickname;
    }
}
