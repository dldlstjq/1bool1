package com.ssafy.db.entity;

import javax.persistence.Column;
import java.time.LocalDateTime;

public interface BoardSearch {
    String getTitle();

    String getContent();

    String getPhoto();

    String getPassword();

    String getNickname();

    Long getId();

    LocalDateTime getCreated_date();

    LocalDateTime getModified_date();

    Integer getCnt();


}
