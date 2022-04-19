package com.ssafy.db.entity;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class GoodsUserManagement extends BaseEntity{

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",nullable = false)
    User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "goods_id",nullable = false)
    CrawlingGoods crawlingGoods;


    @Column(name = "isLiked")
    Integer isLiked;
    @Column(name = "is_Notification")
    Integer is_Notification;

}
