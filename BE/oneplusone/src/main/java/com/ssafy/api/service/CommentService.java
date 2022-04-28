package com.ssafy.api.service;

import com.ssafy.api.dto.CommentDto;
import com.ssafy.db.entity.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findComment(Long boardId);

    Comment createComment(CommentDto.CommentPostRequest commentPostRequest);

    boolean modifyComment(CommentDto.CommentPutRequest dto);

    boolean removeComment(CommentDto.CommentDeleteRequest dto);
}
