package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.BoardSearch;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardLikeRepository;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    BoardRepository boardRepository;

    @Autowired
    BoardLikeRepository boardLikeRepository;
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
        return boardRepository.save(board);
    }

    @Override
    public Page<BoardDto.BoardLikeGet> findBoard(Integer page, Integer size,Pageable pageable) {
        List<BoardLike> list = boardLikeRepository.findAllOrderBySQL();
        List<BoardDto.BoardLikeGetOrderBy> newOne = new ArrayList<>();
        BoardDto.BoardLikeGetOrderBy temp;
        List<Board> another;
        another = boardRepository.findAll();
        for(int i = 0; i < list.size(); i++){
            temp = new BoardDto.BoardLikeGetOrderBy();
            temp.setBoard(boardRepository.findById(list.get(i).getBoard_id()).orElseGet(() -> null));
            temp.setCnt(list.get(i).getCnt());
            another.remove(boardRepository.findById(list.get(i).getBoard_id()).orElseGet(() -> null)); //삭제 처리
            newOne.add(temp);
        }

        BoardDto.BoardLikeGetOrderBy t;
        for(int i = 0; i < another.size(); i++){
            t = new BoardDto.BoardLikeGetOrderBy();
            t.setBoard(another.get(i));
            t.setCnt(0L);
            newOne.add(t);
        }
        List<BoardDto.BoardLikeGet> ans = new ArrayList<>();
        //끝 처리
        BoardDto.BoardLikeGet test;
        for(int i = 0; i < newOne.size(); i++){
            test = new BoardDto.BoardLikeGet();
            test.setId(newOne.get(i).getBoard().getId());
            test.setContent(newOne.get(i).getBoard().getContent());
            test.setNickname(newOne.get(i).getBoard().getNickname());
            test.setPassword(newOne.get(i).getBoard().getPassword());
            test.setPhoto(newOne.get(i).getBoard().getPhoto());
            test.setTitle(newOne.get(i).getBoard().getTitle());
            test.setCreatedDate(newOne.get(i).getBoard().getCreatedDate());
            test.setModifiedDate(newOne.get(i).getBoard().getModifiedDate());
            test.setCnt(newOne.get(i).getCnt());
            ans.add(test);
        }
        Collections.sort(ans, new Comparator<BoardDto.BoardLikeGet>() {
            @Override
            public int compare(BoardDto.BoardLikeGet s1, BoardDto.BoardLikeGet s2) {
                if (s1.getId() < s2.getId()) {
                    return 1;
                } else if (s1.getId() > s2.getId()) {
                    return -1;
                }
                return 0;
            }
        });
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), ans.size());
        final Page<BoardDto.BoardLikeGet> p = new PageImpl<>(ans.subList(start, end), pageable, ans.size());

        return p;
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
            board.update(boardPutRequest.getTitle(), boardPutRequest.getContent(),boardPutRequest.getPassword() , boardPutRequest.getPhoto(), boardPutRequest.getNickname());
            return true;
        }
        return false;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean removeBoard(BoardDto.BoardDeleteRequest dto) {
        Board board = boardRepository.findByPasswordAndId(dto.getPassword(),dto.getId()).orElseGet(() -> null);
        if(board != null){
            boardRepository.deleteById(dto.getId());
            return true;
        }
        return false;
    }

    @Override
    public Board findBoardDetail(Long id) {
        return boardRepository.findById(id).orElseGet(() -> null);
    }

    @Override
    public List<BoardSearch> findBySearchBoard(String search) {
        String temp = "%"+search+"%";
        search = temp;
        List<BoardSearch> list = boardRepository.findByTitleContainingOrContentContaining(search,search);
        return list;
    }
}
