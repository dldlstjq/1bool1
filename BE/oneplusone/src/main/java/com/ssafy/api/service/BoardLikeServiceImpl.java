package com.ssafy.api.service;

import com.ssafy.api.dto.BoardDto;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.BoardLikeRepository;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public Page<BoardDto.BoardLikeGet> findByBoard(Integer page, Integer size, Pageable pageable) {
//        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());
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

        //이 곳은 게시글 좋아요 갯수를 받지 못한 곳 입니다.
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
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), ans.size());
        final Page<BoardDto.BoardLikeGet> p = new PageImpl<>(ans.subList(start, end), pageable, ans.size());
        return p;
    }

    @Override
        public boolean findLike(BoardDto.BoardLikeGetRequest dto) {
            Board board = boardRepository.findById(dto.getId()).orElseGet(() -> null);
            User user = userRepository.findById(dto.getUserId()).orElseGet(()->null);
            BoardLikeManagement boardLikeManagement = boardLikeRepository.findByBoardAndUser(board,user);

        if(boardLikeManagement == null){
            return false;
        }else {
            if(boardLikeManagement.getIsLiked() == 0){
                return false;
            }
            return true;
        }

    }

    @Override
    public List<BoardDto.BoardLikeGet> findByBoardWeek() {
        List<BoardLike> list = boardLikeRepository.findBoardLikeOrderBySQL();
        List<BoardDto.BoardLikeGet> ans = new ArrayList<>();
        if(list.size() == 0){
            return new ArrayList<>();
        }else{

            BoardDto.BoardLikeGet recipeLikeGet;
            Board recipe;
            StringTokenizer tk;
            for(int i = 0; i < list.size(); i++){
                recipeLikeGet = new BoardDto.BoardLikeGet();
                recipe = boardRepository.findById(list.get(i).getBoard_id()).orElseGet(() -> null);
                tk = new StringTokenizer(recipe.getPhoto(),",");
                recipeLikeGet.setCnt(list.get(i).getCnt());
                recipeLikeGet.setPhoto(tk.nextToken());
                recipeLikeGet.setPassword(recipe.getPassword());
                recipeLikeGet.setContent(recipe.getContent());
                recipeLikeGet.setNickname(recipe.getNickname());
                recipeLikeGet.setTitle(recipe.getTitle());
                recipeLikeGet.setId(recipe.getId());
                recipeLikeGet.setModifiedDate(recipe.getModifiedDate());
                recipeLikeGet.setCreatedDate(recipe.getCreatedDate());
                ans.add(recipeLikeGet);
            }
        }
        return ans;

    }

    @Override
    public List<BoardSearch> findBoardLike(Long userId) {
        List<BoardLikeManagement> boards = boardLikeRepository.findByUserId(userId);
        List<BoardSearch> list = new ArrayList<>();
        for(int i = 0; i < boards.size(); i++){
            list.add(boardRepository.findByIdSQL(boards.get(i).getBoard().getId()));
        }
        Collections.sort(list,new Comparator<BoardSearch>() {
            @Override
            public int compare(BoardSearch s1, BoardSearch s2) {
                if (s1.getId() < s2.getId()) {
                    return 1;
                } else if (s1.getId() > s2.getId()) {
                    return -1;
                }
                return 0;
            }
        });

        return list;
    }
}
