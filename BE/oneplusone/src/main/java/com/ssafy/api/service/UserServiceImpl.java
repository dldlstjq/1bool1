package com.ssafy.api.service;

import com.google.gson.*;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.ssafy.api.dto.UserDto.UserRegisterPostReq;
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

	@Autowired
	GoodsLikeRepository goodsLikeRepository;

	@Autowired
	RecipeLikeRepository recipeLikeRepository;

	@Autowired
	GoodsRepository goodsRepository;

	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setEmail(userRegisterInfo.getEmail());
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickname(userRegisterInfo.getNickname());
		user.setIsWithdrawal(userRegisterInfo.getIsWithdrawal());
		user.setIsAlarm(0);
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

		Long email = userPutReq.getId();
		String password = userPutReq.getPassword();
		String nickname = userPutReq.getNickname();
//		Integer isWtihdrawal = userPutReq.getIsWithdrawal();
		Integer isAlarm = userPutReq.getIsAlarm();
		User user = userRepository.findById(email).orElseGet(()-> null);

		if(user != null){
			user.setNickname(nickname);
			user.update(user.getEmail(),user.getPassword(),user.getNickname(),user.getIsWithdrawal(),isAlarm);
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

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=036e9cc127f3c0b11192c751fab0d62b"); // TODO REST_API_KEY 입력
			sb.append("&redirect_uri=http://localhost:8080/v1/users/kakao"); // TODO 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

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
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token);
			int responseCode = conn.getResponseCode();

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}

			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);
			JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
			System.out.println("element : " + element);

			id = element.getAsJsonObject().get("id").getAsLong();
			System.out.println("id : " + id);

			boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
			if(hasEmail){
				br.close();
				return id;
			}else{
				br.close();
				return 0L;
			}


		} catch (IOException e) {
			e.printStackTrace();
		}
		return id;
	}


	public int createKakaoAlarm(String token, Long userId) throws Exception {
		String reqURL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
		Long id =0L;
		int result_code = 0;
		try {

			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token);

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "utf-8"));
			StringBuilder sb = new StringBuilder();
			sb.append("template_object=");
			String temp = KakaoTemplateBestGoods();
			System.out.println(temp);
			sb.append(temp);

			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			String content = conn.getResponseMessage();
			System.out.println("content : " + content);
			System.out.println("responseCode : " + responseCode);
			if(responseCode == 200)
				result_code  = 0;
			else
				result_code = -1;

		} catch (IOException e) {
			e.printStackTrace();
		}
		return result_code;
	}

	@Override
	public User getEmailUser(String id) throws Exception {
		return userRepository.findByEmail(id).orElseGet(()->null);
	}

	@Override
	public int findKakaoFriend(String token, Long method) throws  Exception {
		int result_code = 0;
		String reqURL = "https://kapi.kakao.com/v1/api/talk/friends?friend_order=nickname";
		URL url = new URL(reqURL);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();


		conn.setRequestMethod("GET");
		conn.setDoOutput(true);
		conn.setRequestProperty("Authorization", "Bearer " + token);
		try{
			int responseCode = conn.getResponseCode();
			String content = conn.getResponseMessage();
			Object temp  = conn.getContent();
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
			String line;
			String ans ="";
			while ((line = in.readLine()) != null) {
				ans += line;
			}
			//System.out.println(ans);
			JsonParser jsonParser = new JsonParser();
			JsonObject jsonObject = (JsonObject)jsonParser.parse(ans);
			JsonArray jsonArray = jsonObject.get("elements").getAsJsonArray();
			for (JsonElement friend : jsonArray){
				Long friendId = friend.getAsJsonObject().get("id").getAsLong();
				String Id = String.valueOf(friendId);
				Integer a = userRepository.findByEmail(Id).orElseGet(()->null).getIsAlarm();
				if(a == null || a == 0){
					continue;
				}else {
					String friendUuid = friend.getAsJsonObject().get("uuid").getAsString();
					result_code = sendKakaoMessageFriend(token, friendUuid, method, friendId);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result_code;
	}

	public Integer sendKakaoMessageFriend(String token, String friendUuid, Long method, Long friendId) throws Exception {

		String reqURL = "https://kapi.kakao.com/v1/api/talk/friends/message/default/send";
		URL url = new URL(reqURL);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		StringBuilder sb = new StringBuilder();

		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		conn.setRequestProperty("ContentType", "application/x-www-form-urlencoded");
		conn.setRequestProperty("Authorization", "Bearer " + token);

		String template;
		if(method==1){
			template = KakaoTemplateLikeGoods(friendId);
		}
		else if(method==2){
			template = KakaoTemplateBestRecipe();
		}
		else{
			template = KakaoTemplateBestGoods();
		}

		Map<String,String> parameter = new HashMap<>();
		parameter.put("receiver_uuids", "[\"" + friendUuid + "\"]");

		parameter.put("template_object", template);
		for (String key : parameter.keySet()) {
			if (sb.length() > 0) {
				sb.append("&");
			}
			sb.append(key);
			sb.append("=");
			sb.append(parameter.get(key));
		}
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "utf-8"));

		String param = sb.toString();

		bw.write(param);
		bw.flush();

		int responseCode = conn.getResponseCode();
		String content = conn.getResponseMessage();
		System.out.println("content : " + content);
		System.out.println("responseCode : " + responseCode);
		return -1;
	}

	public String eventType(Long event){
		if (event == 2){
			return "1쁠라스1";
		}
		else if (event == 3){
			return "2쁠라스1";
		}
		else if (event == 4){
			return "3쁠라스1";
		}
		else if (event == 5){
			return "가격 SALE 중";
		}
		else if (event == 6){
			return "덤 증정";
		}
		else{
			return "균일가";
		}
	}

	public String convinenceType(String convinence){
		if (convinence == "CU"){
			return "CU";
		}
		else if (convinence == "GS"){
			return "GS25";
		}
		else if (convinence == "MS"){
			return "미니스탑";
		}
		else if (convinence == "SE"){
			return "세븐일레븐";
		}
		else if (convinence == "EM"){
			return "이마트24";
		}
		else{
			return "Cspace";
		}
	}

	public String KakaoTemplateLikeGoods(Long userId){
		List<GoodsLike2> goodsLike2s= goodsLikeRepository.findUserLikeGoods(userId);
		StringBuilder sb = new StringBuilder();

		if (goodsLike2s.size() < 2){
			sb.append("" +
					"{\n" +
					"        \"object_type\": \"text\",\n" +
					"        \"text\": \"좋아요 누른 물건이 적어요 ㅠㅠ\",\n" +
					"        \"link\": {\n" +
					"            \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
					"            \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\"\n" +
					"        },\n" +
					"        \"button_title\": \"좋아요 누르러 가기!\"\n" +
					"    }" +
					"");
		}
		else{
			sb.append("" +
					"{\n" +
					"        \"object_type\": \"list\",\n" +
					"        \"header_title\": \"좋아요 누른 상품들 행사중!\",\n" +
					"        \"header_link\": {\n" +
					"            \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
					"            \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
					"            \"android_execution_params\": \"main\",\n" +
					"            \"ios_execution_params\": \"main\"\n" +
					"        },\n" +
					"        \"contents\": [\n" );


			for (int i = 0; i < goodsLike2s.size(); i++){
				sb.append("" +
						"{\n" +
						"                \"title\": \"");
				sb.append(goodsLike2s.get(i).getName());
				sb.append(
						"\",\n" +
								"                \"description\": \"");
				sb.append(convinenceType(goodsLike2s.get(i).getConvinence())
						+" : " + eventType(goodsLike2s.get(i).getEvent()));
				sb.append(
						"\",\n" +
								"                \"image_url\": \"");
				if(goodsLike2s.get(i).getConvinence().equals("CU")){
					sb.append("https:"+goodsLike2s.get(i).getPhoto_path());
				}else{
					sb.append(goodsLike2s.get(i).getPhoto_path());
				}
				sb.append(
						"\",\n" +
								"                \"image_width\": 640,\n" +
								"                \"image_height\": 640,\n" +
								"                \"link\": {\n" +
								"                    \"web_url\": \"https://k6d207.p.ssafy.io\",\n" +
								"                    \"mobile_web_url\": \"https://k6d207.p.ssafy.io\",\n" +
								"                    \"android_execution_params\": \"/contents/3\",\n" +
								"                    \"ios_execution_params\": \"/contents/3\"\n" +
								"                }\n" +
								"            }" +
								"");
				if(i != goodsLike2s.size() -1 ){
					sb.append(',');
				}
			}

			sb.append(
					"        ],\n" +
							"        \"buttons\": [\n" +
							"            {\n" +
							"                \"title\": \"확인하러 가기!\",\n" +
							"                \"link\": {\n" +
							"                    \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
							"                    \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\"\n" +
							"                }\n" +
							"            }\n" +
							"        ]\n" +
							"    }" +
							"");
		}

		return sb.toString();
	}

	public String KakaoTemplateBestRecipe(){
		StringBuilder sb = new StringBuilder();
		List<RecipeKakao> recipeLikes = recipeLikeRepository.findRecipeLikeOrderBySQLTop4ForKaKao();

		sb.append("" +
				"{\n" +
				"        \"object_type\": \"list\",\n" +
				"        \"header_title\": \"Top3 편스토랑 레시피!\",\n" +
				"        \"header_link\": {\n" +
				"            \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
				"            \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
				"            \"android_execution_params\": \"main\",\n" +
				"            \"ios_execution_params\": \"main\"\n" +
				"        },\n" +
				"        \"contents\": [\n" );


		for (int i = 0; i < recipeLikes.size(); i++){
			goodsKakao good = goodsRepository.findPhotopathKakao(recipeLikes.get(i).getId());
			sb.append("" +
					"{\n" +
					"                \"title\": \"");
			sb.append(recipeLikes.get(i).getTitle());
			sb.append(
					"\",\n" +
							"                \"description\": \"");
			sb.append(recipeLikes.get(i).getDescription());
			sb.append(
					"\",\n" +
							"                \"image_url\": \"");
			sb.append(good.getPhoto_path());
			sb.append(
					"\",\n" +
							"                \"image_width\": 640,\n" +
							"                \"image_height\": 640,\n" +
							"                \"link\": {\n" +
							"                    \"web_url\": \"https://k6d207.p.ssafy.io\",\n" +
							"                    \"mobile_web_url\": \"https://k6d207.p.ssafy.io\",\n" +
							"                    \"android_execution_params\": \"/contents/3\",\n" +
							"                    \"ios_execution_params\": \"/contents/3\"\n" +
							"                }\n" +
							"            }" +
							"");
			if(i != recipeLikes.size() -1 ){
				sb.append(',');
			}
		}

		sb.append(
				"        ],\n" +
						"        \"buttons\": [\n" +
						"            {\n" +
						"                \"title\": \"만드는 법 확인!\",\n" +
						"                \"link\": {\n" +
						"                    \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
						"                    \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\"\n" +
						"                }\n" +
						"            }\n" +

						"        ]\n" +
						"    }" +
						"");

		return sb.toString();
	};

	public String KakaoTemplateBestGoods(){
		StringBuilder sb = new StringBuilder();
		List<GoodsLike2> goodsLike2s = goodsRepository.findBest3Kakao();

		sb.append("" +
				"{\n" +
				"        \"object_type\": \"list\",\n" +
				"        \"header_title\": \"Top3 편의점 상품!\",\n" +
				"        \"header_link\": {\n" +
				"            \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
				"            \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
				"            \"android_execution_params\": \"main\",\n" +
				"            \"ios_execution_params\": \"main\"\n" +
				"        },\n" +
				"        \"contents\": [\n" );


		for (int i = 0; i < goodsLike2s.size(); i++){

			sb.append("" +
					"{\n" +
					"                \"title\": \"");
			sb.append(goodsLike2s.get(i).getName());
			sb.append(
					"\",\n" +
							"                \"description\": \"");
			sb.append(goodsLike2s.get(i).getPrice());
			sb.append(
					"\",\n" +
							"                \"image_url\": \"");
			if(goodsLike2s.get(i).getConvinence().equals("CU")){
				sb.append("https:"+goodsLike2s.get(i).getPhoto_path());
			}else{
				sb.append(goodsLike2s.get(i).getPhoto_path());
			}

			sb.append(
					"\",\n" +
							"                \"image_width\": 640,\n" +
							"                \"image_height\": 640,\n" +
							"                \"link\": {\n" +
							"                    \"web_url\": \"https://k6d207.p.ssafy.io\",\n" +
							"                    \"mobile_web_url\": \"https://k6d207.p.ssafy.io\",\n" +
							"                    \"android_execution_params\": \"/contents/3\",\n" +
							"                    \"ios_execution_params\": \"/contents/3\"\n" +
							"                }\n" +
							"            }" +
							"");
			if(i != goodsLike2s.size() -1 ){
				sb.append(',');
			}
		}

		sb.append(
				"        ],\n" +
						"        \"buttons\": [\n" +
						"            {\n" +
						"                \"title\": \"상품 확인하러 가기!\",\n" +
						"                \"link\": {\n" +
						"                    \"web_url\": \"https://k6d207.p.ssafy.io/\",\n" +
						"                    \"mobile_web_url\": \"https://k6d207.p.ssafy.io/\"\n" +
						"                }\n" +
						"            }" +

						"        ]\n" +
						"    }" +
						"");


		return sb.toString();
	};

}
