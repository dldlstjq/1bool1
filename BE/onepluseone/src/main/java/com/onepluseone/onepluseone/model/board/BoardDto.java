package com.onepluseone.onepluseone.model.board;

import lombok.Data;

@Data
public class BoardDto {
  Integer id;
  String title;
  String content;
  String photo;
  String password;
  String nickname;
  String startDate;
  String updateDate;
}
