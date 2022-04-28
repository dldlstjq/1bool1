package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.QComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class CommentRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QComment qComment = QComment.comment;

}
