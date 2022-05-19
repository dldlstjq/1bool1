package com.ssafy.api.controller;

import com.ssafy.api.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.dto.UserDto.UserLoginPostReq;
import com.ssafy.api.dto.UserDto.UserRegisterPostReq;
import com.ssafy.api.dto.UserDto.UserLoginPostRes;
import com.ssafy.api.dto.UserDto.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */

@Api(value = "유저 API", tags = {"User"})
@RestController
@CrossOrigin("*")
@RequestMapping("/v1/users")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;


	@GetMapping("/checkId")
	@ApiOperation(value = "아이디 중복 조회", notes = "회원가입을 위해 아이디가 중복되는지 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> checkUserIdDuplicate(@ApiParam(value="입력 id 정보", required = true) @RequestParam String email) {

		Boolean check = userService.checkIdDuplicate(email);
		if(!check)
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이미 존재하는 아이디입니다."));
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용가능한 아이디입니다."));

	}


	@PutMapping()
	@ApiOperation(value = "회원 정보 수정 및 탈퇴 처리", notes = "회원 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> modifyUser(@ApiParam(value="", required = true) @RequestBody UserDto.UserPutReq userPutReq) {
		if(userService.update(userPutReq)) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}else{
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Fail"));
		}
	}


	@ResponseBody
	@PostMapping("/kakao")
	public ResponseEntity<? extends BaseResponseBody> kakaoAccessToken(@RequestParam("token") String token) throws Exception {
		if(!token.equals("")) {
			Long id = userService.createKakaoUser(token);
			User user = userService.getUserByUserId(String.valueOf(id));
			if(user != null){
				if(user.getIsWithdrawal() == 1){
					return ResponseEntity.status(200).body(BaseResponseBody.of(200, "탈퇴한 사용자 입니다."));
				}
				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",user));
			}else {
				UserRegisterPostReq registerInfo = new UserRegisterPostReq();
				registerInfo.setEmail(String.valueOf(id));
				registerInfo.setNickname("KAKAO");
				registerInfo.setPassword("kakao12!@");
				registerInfo.setIsWithdrawal(0);
				user = userService.createUser(registerInfo);
				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",user));
			}
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "token 값이 일치하지 않습니다."));
	}

	@ResponseBody
	@PostMapping("/kakaoAlarm")
	public ResponseEntity<? extends BaseResponseBody> kakaoAlarm(@RequestParam("token") String token, @RequestParam("userid") Long userId) throws Exception {
		if (!token.equals("")) {
			int code = userService.createKakaoAlarm(token, userId);
			if (code == 0)
				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "알림 성공!!"));
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "알림이 안와요ㅠㅠ"));
		}
		else
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "토큰이 없음"));
	}


	@GetMapping("/kakaoFriend")
	@ApiOperation(value = "카카오 친구 메시지 보내기", notes = "로그인한 사용자의 카카오 로그인 조회")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> sendKakaoMessageFriend(@RequestParam("token") String token, @RequestParam("method") Long method) throws Exception {

		Integer check = userService.findKakaoFriend(token, method);
		if(check != 0)
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "친구 조회 성공"));
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "친구 조회 실패"));

	}


}
