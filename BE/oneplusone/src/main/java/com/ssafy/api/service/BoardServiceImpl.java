package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    BoardRepository boardRepository;

    @Override
    public Board createBoard(BoardDto.BoardPostRequest boardPostRequest) {
        Board board = new Board();
        board.setNickname(boardPostRequest.getNickname());
        board.setPassword(boardPostRequest.getPassword());
        board.setContent(boardPostRequest.getContent());
        board.setPhoto(boardPostRequest.getPhoto());
        board.setTitle(boardPostRequest.getTitle());
        board.setStartDate(boardPostRequest.getStartDate());

        return boardRepository.save(board);
    }
}