package com.ssafy.api.service;

import com.ssafy.api.dto.CommentDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    CommentRepository commentRepository;
    @Override
    public List<Comment> findComment(Long boardId) {
        return commentRepository.findByBoardId(boardId);
    }

    @Override
    @Transactional
    public Comment createComment(CommentDto.CommentPostRequest commentPostRequest) {
        Comment comment = new Comment();
        Board board = new Board();
        board.setId(commentPostRequest.getBoardId());
        comment.setContent(commentPostRequest.getContent());
        comment.setBoard(board);
        comment.setPassword(commentPostRequest.getPassword());
        comment.setNickname(commentPostRequest.getNickname());
        return commentRepository.save(comment);
    }

    @Override
    @Transactional
    public boolean modifyComment(CommentDto.CommentPutRequest dto) {
        Comment comment;
        comment = commentRepository.findByBoardIdAndId(dto.getBoardId(),dto.getId());
        if( comment == null){
            return false;
        }else {

            comment.update(dto.getNickname(), dto.getContent(), dto.getPassword());
            return true;
        }
    }

    @Override
    public boolean removeComment(CommentDto.CommentDeleteRequest dto) {
        Comment comment;
        comment = commentRepository.findByBoardIdAndIdAndPassword(dto.getBoardId(),dto.getId(),dto.getPassword());
        if(comment == null){
            return false;
        }else {
            commentRepository.delete(comment);
            return true;
        }
    }
}
