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
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    BoardRepository boardRepository;

    @Override
    @Transactional
    public Board createBoard(BoardDto.BoardPostRequest boardPostRequest) {
        Board board = new Board();
        board.setNickname(boardPostRequest.getNickname());
        board.setPassword(boardPostRequest.getPassword());
        board.setContent(boardPostRequest.getContent());
        board.setPhoto(boardPostRequest.getPhoto());
        board.setTitle(boardPostRequest.getTitle());
        Date date = new Date();
        boardPostRequest.setStartDate(date);
        board.setStartDate(boardPostRequest.getStartDate());
        return boardRepository.save(board);
    }

    @Override
    public List<Board> findBoard() {
        return boardRepository.findAll();
    }

    @Override
    @Transactional
    public boolean modifyBoard(BoardDto.BoardPutRequest boardPutRequest) {

        Board board = boardRepository.findByPasswordAndId(boardPutRequest.getPassword(),boardPutRequest.getId()).orElseGet(() -> null);
        if(board != null) {
            board.setPassword(boardPutRequest.getPassword());
            board.setNickname(boardPutRequest.getNickname());
            board.setTitle(boardPutRequest.getTitle());
            board.setContent(boardPutRequest.getContent());
            board.setPhoto(boardPutRequest.getPhoto());
            Date date = new Date();
            board.setStartDate(date);
            board.update(boardPutRequest.getTitle(), boardPutRequest.getContent(),boardPutRequest.getPassword() ,boardPutRequest.getUpdateDate(), boardPutRequest.getPhoto(), boardPutRequest.getNickname());
            return true;
        }
        return false;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean removeBoard(Long id) {
        boardRepository.deleteById(id);
        return true;
    }
}
