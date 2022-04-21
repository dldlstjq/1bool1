package com.ssafy.api.service;

import com.ssafy.api.dto.UserDto;
import com.ssafy.api.dto.UserDto.UserRegisterPostReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);


	Boolean checkIdDuplicate(String userId);
	User getUserByUserId(String userId);

	Boolean update(UserDto.UserPutReq user);

//	Boolean update(UserDto.UserPutReq userPutReq);
}
