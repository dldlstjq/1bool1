package com.ssafy.api.service;

import com.ssafy.api.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.dto.UserDto.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.transaction.annotation.Transactional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRepositorySupport userRepositorySupport;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setEmail(userRegisterInfo.getEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickname(userRegisterInfo.getNickname());
		user.setIsWithdrawal(userRegisterInfo.getIsWithdrawal());
		return userRepository.save(user);
	}

	@Override
	public Boolean checkIdDuplicate(String email){
		return userRepositorySupport.checkUserByEmail(email);
	}

	@Override
	public User getUserByUserId(String email) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findByEmail(email).get();
		return user;
	}

	@Override
	@Transactional
	public Boolean update(UserDto.UserPutReq userPutReq) {
		String email = userPutReq.getEmail();
		String password = userPutReq.getPassword();
		String nickname = userPutReq.getNickname();
		User user = userRepository.findByEmail(email).orElseGet(()-> null);

		if(user != null && passwordEncoder.matches(password,user.getPassword())){
			user.setNickname(nickname);
			user.update(user.getEmail(),user.getPassword(),nickname);
			return true;
		}
		return false;
	}

//	@Override
//	public Boolean update(UserDto.UserPutReq userPutReq) {
//		User user = new User();
//		user.update(userPutReq.getEmail(),userPutReq.getPassword(),userPutReq.getNickname());
//		return true;
//	}
}
