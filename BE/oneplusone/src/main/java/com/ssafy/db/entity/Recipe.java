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

    //내용
    @Column(name = "content")
    String content;

    //사진 경로
    @Column(name = "photo", length = 5000)
    String photo;

    //비밀번호
    @Column(name = "password", nullable = false)
    String password;

    //닉네임
    @Column(name = "nickname", nullable = false)
    String nickname;
    
    //시작 시간
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "start_date", nullable = false)
//    Date startDate;
//
//    //수정된 시간
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "update_date")
//    Date updateDate;

    public void update(String title, String content, String password,String photo,String nickname) {
        this.title = title;
        this.content = content;
        this.password = password;
//        this.updateDate = new Date();
        this.photo = photo;
        this.nickname = nickname;
    }

    @Builder
    public Recipe(Long id, String title, String content,String photo, String password, String nickname){
        this.id = id;
        this.title = title;
        this.content = content;
        this.photo = photo;
        this.password = password;
        this.nickname = nickname;
//        this.startDate = startDate;
//        this.updateDate = updateDate;
    }

//    public void update(String title, String content, String password,Date updateDate,String photo,String nickname) {
//        this.title = title;
//        this.content = content;
//        this.password = password;
//        this.updateDate = new Date();
//        this.photo = photo;
//        this.nickname = nickname;
//    }
//
//    @Builder
//    public Recipe(Long id, String title, String content,String photo, String password, String nickname,Date startDate, Date updateDate){
//        this.id = id;
//        this.title = title;
//        this.content = content;
//        this.photo = photo;
//        this.password = password;
//        this.nickname = nickname;
//        this.startDate = startDate;
//        this.updateDate = updateDate;
//    }
}
