package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Getter
@Setter
public class Event extends BaseEntity{

    @Column(name = "title")
    String title;


    //사진 경로
    @Column(name = "photo_path")
    String photoPath;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    Date date;
}
