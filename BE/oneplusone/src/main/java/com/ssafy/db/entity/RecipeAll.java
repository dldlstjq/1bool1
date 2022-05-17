package com.ssafy.db.entity;

import java.time.LocalDateTime;

public interface RecipeAll {
    Integer getCnt();
    Long getId();
    LocalDateTime getCreatedDate();
    LocalDateTime getModifiedDate();
    String getContent();
    String getDescription();
    Integer getMinute();
    String getNickname();
    String getPassword();
    String getPhoto();
    Integer getStar();
    String getTitle();
    Long getPrice();

}
