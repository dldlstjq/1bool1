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
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;


	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			 @RequestBody @ApiParam(value="회원가입 정보", required = true) @Valid UserRegisterPostReq registerInfo) {

		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

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

//	@GetMapping("/login")
//	@ApiOperation(value = "로그인", notes = "로그인에 시도한다.")
//	@ApiResponses({
//			@ApiResponse(code = 200, message = "성공"),
//			@ApiResponse(code = 401, message = "인증 실패"),
//			@ApiResponse(code = 404, message = "사용자 없음"),
//			@ApiResponse(code = 500, message = "서버 오류")
//	})
//	public ResponseEntity<? extends BaseResponseBody> Login(@ApiParam(value="입력 email", required = true) @RequestParam("email") String email ,@RequestParam("password") String password) {
//		UserLoginPostReq user = new UserLoginPostReq();
//		user.setPassword(password);
//		user.setEmail(email);
//		User userDto = userService.login(user);
//		if(userDto != null) {
//			if(!passwordEncoder.matches(user.getPassword(),userDto.getPassword())){
//				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "패스워드 값을 확인하세요"));
//			}
//			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "로그인 성공",user));
//		}return ResponseEntity.status(200).body(BaseResponseBody.of(200, "로그인 실패"));
//	}

	@PutMapping()
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다.")
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
	/**
	 * KAKAO 소셜 로그인 기능
	 * @return ResponseEntity<AuthResponse>
	 */
	@ResponseBody
	@GetMapping("/kakao")
	public ResponseEntity<? extends BaseResponseBody> kakaoCallback(@RequestParam String code) throws Exception {
		String token = userService.getKakaoAccessToken(code);
		if(token.equals("")) {
			Long id = userService.createKakaoUser(token);
			User user = userService.getUserByUserId(String.valueOf(id));
			if(user != null){
				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
			}else {
				UserRegisterPostReq registerInfo = new UserRegisterPostReq();
				registerInfo.setEmail(String.valueOf(id));
				registerInfo.setNickname("KAKAO");
				registerInfo.setPassword("kakao12!@");
				registerInfo.setIsWithdrawal(0);
				userService.createUser(registerInfo);
			}
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

//	@ResponseBody
//	@PostMapping("/kakao")
//	public ResponseEntity<? extends BaseResponseBody> kakaoAccessToken(@RequestParam String token) throws Exception {
//
//
//		userService.getEmailUser(id);
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//	}


	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername(); //Email
		User user = userService.getUserByUserId(userId);

		return ResponseEntity.status(200).body(UserRes.of(user));
	}


}
