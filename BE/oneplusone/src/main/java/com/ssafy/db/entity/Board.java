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

    //내용
    @Column(name = "content",nullable = false)
    String content;

    //사진 경로
    @Column(name = "photo",length = 5000)
    String photo;

    //비밀번호
    @Column(name = "password",nullable = false)
    String password;

    //닉네임
    @Column(name = "nickname",nullable = false)
    String nickname;

    //시작 시간
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date",nullable = false)
    Date startDate;

    //수정된 시간
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date")
    Date updateDate;

    @Builder
    public Board(Long id){
        this.id = id;
    }

    @Builder
    public Board(Long id, String title, String content,String photo, String password, String nickname,Date startDate, Date updateDate){
        this.id = id;
        this.title = title;
        this.content = content;
        this.photo = photo;
        this.password = password;
        this.nickname = nickname;
        this.startDate = startDate;
        this.updateDate = updateDate;
    }

    public void update(String title, String content, String password,Date updateDate,String photo,String nickname) {
        this.title = title;
        this.content = content;
        this.password = password;
        this.updateDate = new Date();
        this.photo = photo;
        this.nickname = nickname;
    }
}
