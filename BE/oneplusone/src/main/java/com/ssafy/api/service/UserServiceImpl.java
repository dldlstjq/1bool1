package com.ssafy.api.service;

import com.google.gson.JsonObject;
import com.ssafy.api.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.gson.JsonParser;
import com.google.gson.JsonElement;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

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
		User user = userRepositorySupport.findByEmail(email).orElseGet(() -> null);
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


	@Override
	public String getKakaoAccessToken (String code) {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";
		System.out.println("code =" + code);
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			//POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			//POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=036e9cc127f3c0b11192c751fab0d62b"); // TODO REST_API_KEY 입력
			sb.append("&redirect_uri=http://localhost:8080/api/v1/users/kakao"); // TODO 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			//결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			//요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			//Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			access_Token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);
			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return access_Token;
	}


	public Long createKakaoUser(String token) throws Exception {
		String reqURL = "https://kapi.kakao.com/v2/user/me";
		Long id =0L;
		//access_token을 이용하여 사용자 정보 조회
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송
			//결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			//요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			//Gson 라이브러리로 JSON파싱
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);
			JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
			System.out.println("element : " + element);

//			String email = kakao_account.getAsJsonObject().get("email").getAsString();
			id = element.getAsJsonObject().get("id").getAsLong();
			System.out.println("id : " + id);

			boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
			if(hasEmail){
				br.close();
				return id;
//				email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("account_email").getAsString();
			}else{
				br.close();
				return 0L;
			}


		} catch (IOException e) {
			e.printStackTrace();
		}
		return id;
	}

//	@Override
//	public void getEmailUser(Long id) throws Exception{
//		String reqURL = "https://kapi.kakao.com/v2/user/me";
//		//access_token을 이용하여 사용자 정보 조회
//		try {
//			URL url = new URL(reqURL);
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//			conn.setRequestMethod("POST");
//			conn.setDoOutput(true);
//			conn.setRequestProperty("Authorization", "KakaoAK " + "84855b2a3cf41e2bb77719fc79528128"); //전송할 header 작성, access_token전송
//
//			//결과 코드가 200이라면 성공
//			int responseCode = conn.getResponseCode();
//			System.out.println("responseCode : " + responseCode);
//
//			//요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//			String line = "";
//			String result = "";
//
//			while ((line = br.readLine()) != null) {
//				result += line;
//			}
//			System.out.println("response body : " + result);
//
//			//Gson 라이브러리로 JSON파싱
//			JsonParser parser = new JsonParser();
//			JsonElement element = parser.parse(result);
//
//			id = element.getAsJsonObject().get("id").getAsLong();
//
//
//			JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
//			JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
//
//			String nickname = properties.getAsJsonObject().get("nickname").getAsString();
//			String email = kakao_account.getAsJsonObject().get("email").getAsString();
//
////			boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
////			if(hasEmail){
////				email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
////			}
//
//			System.out.println("nickname : " + nickname);
//			System.out.println("email : " + email);
//
//			br.close();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}

//	@Override
//	public Boolean update(UserDto.UserPutReq userPutReq) {
//		User user = new User();
//		user.update(userPutReq.getEmail(),userPutReq.getPassword(),userPutReq.getNickname());
//		return true;
//	}
}
