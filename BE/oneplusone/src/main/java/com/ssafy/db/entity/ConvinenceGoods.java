package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ConvinenceGoods extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "goods_id",nullable = false)
    Goods goods;

    @ManyToOne
    @JoinColumn(name = "convinence_id",nullable = false)
    Convinence convinence;

}
