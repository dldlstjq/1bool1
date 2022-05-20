package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
//@NoArgsConstructor
public class GoodsReview extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "goods_id",nullable = false)
    Goods goods;

    //내용
    @Column(name = "nickname", nullable = false)
    String nickname;

    //사진 경로
    @Column(name = "password", nullable = false)
    String password;

    //비밀번호
    @Column(name = "content", nullable = false)
    String content;

    public void update(String nickname,String content, String password) {
        this.content = content;
        this.password = password;
        this.nickname = nickname;
    }

}
