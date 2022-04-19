package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
//@NoArgsConstructor
public class Goods extends BaseEntity{

    @Column(name = "name", nullable = false)
    String name;

    //내용
    @Column(name = "price", nullable = false)
    String price;

    //사진 경로
    @Column(name = "photo_path")
    String photoPath;

    //비밀번호
    @Column(name = "desciption")
    String desciption;

    //닉네임
    @Column(name = "category")
    Integer category;

    //닉네임
    @Column(name = "is_sell")
    Integer isSell;

    //닉네임
    @Column(name = "event")
    Integer event;

    //닉네임
    @Column(name = "hit")
    Integer hit;

    //시작 시간
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date",nullable = false)
    Date startDate;

    //수정된 시간
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date")
    Date updateDate;

    @Builder
    public Goods(Long id, String name, String price,String photoPath, String desciption, Integer category,Integer isSell,Integer event,Integer hit,Date startDate, Date updateDate){
        this.id = id;
        this.name = name;
        this.price = price;
        this.photoPath = photoPath;
        this.desciption = desciption;
        this.category = category;
        this.isSell = isSell;
        this.category = category;
        this.hit = hit;
        this.startDate = startDate;
        this.updateDate = updateDate;
    }
}
