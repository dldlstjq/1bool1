package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Convinence extends BaseEntity{
    @Column(name = "name", nullable = false)
    String name;

    @Builder
    public Convinence(Long id, String title){
        this.id = id;
        this.name = name;
    }
}
