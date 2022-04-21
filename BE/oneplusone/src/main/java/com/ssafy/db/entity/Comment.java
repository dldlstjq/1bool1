package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Comment extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "board_id",nullable = false)
    Board board;

    @Column(name = "nickname",nullable = false)
    String nickname;

    //내용
    @Column(name = "password",nullable = false)
    String password;

    //사진 경로
    @Column(name = "content",nullable = false)
    String content;

    public void update(String nickname,String content, String password) {
        this.content = content;
        this.password = password;
        this.nickname = nickname;
    }
}
