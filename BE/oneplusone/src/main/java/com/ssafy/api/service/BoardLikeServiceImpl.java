package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.BoardLikeManagement;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardLikeRepository;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardLikeServiceImpl implements BoardLikeService {

    @Autowired
    private BoardLikeRepository boardLikeRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Long findByBoardId(BoardDto.BoardLikeGetRequest dto) {
        return boardLikeRepository.findBySQL(dto.getId());
    }

    @Override
    @Transactional
    public boolean modifyBoardLike(BoardDto.BoardLikeGetRequest dto) {
        Board board;
        board = boardRepository.findById(dto.getId()).orElseGet(() -> null);
        if(board == null){
            return false;
        }
        User user;
        user = userRepository.findById(dto.getUserId()).orElseGet(()->null);
        if(user == null) {
            return false;
        }
        BoardLikeManagement boardlike;
        boardlike = boardLikeRepository.findByBoardAndUser(board,user);
        if(boardlike == null){
            boardlike = new BoardLikeManagement();
            boardlike.setIsLiked(1);
            boardlike.setUser(user);
            boardlike.setBoard(board);
            boardLikeRepository.save(boardlike);
            return true;
        }
        boardlike.update(0);
        return true;
    }

    @Override
    public List<BoardDto.BoardLikeGetOrderBy> findByBoard() {
        List<BoardLike> list = boardLikeRepository.findAllOrderBySQL();
        List<BoardDto.BoardLikeGetOrderBy> newOne = new ArrayList<>();
        BoardDto.BoardLikeGetOrderBy temp;
        for(int i = 0; i < list.size(); i++){
            temp = new BoardDto.BoardLikeGetOrderBy();
            temp.setBoard(boardRepository.findById(list.get(i).getBoard_id()).orElseGet(() -> null));
            temp.setCnt(list.get(i).getCnt());
            newOne.add(temp);
        }
        return newOne;
    }
}
