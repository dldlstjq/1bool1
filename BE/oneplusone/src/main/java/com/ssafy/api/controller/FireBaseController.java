package com.ssafy.api.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.api.service.FireBaseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
@Api(value = "firebase API", tags = {"FIREBASE"})
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping(value = "/firebase")
@ApiIgnore
public class FireBaseController {

    @Autowired
    FireBaseService fireBaseService;

    @ApiOperation(value = "firebase Storage에 업로드", notes = "정상업로드되면 url 반환")
    @PostMapping("/upload")
    public List<String> uploadFile(@RequestPart List<MultipartFile> file)
            throws IOException, FirebaseAuthException{
        List<String> ans = new ArrayList<>();

        if(file.isEmpty()){
            ans.add("is empty");
            return ans;
        }

        for(MultipartFile one : file){
            ans.add(fireBaseService.upload(one));
        }
        return ans;
    }

    @ApiOperation(value = "firebase Storage에 파일 삭제", notes = "정상삭제되면 true 반환")
    @PostMapping("/delete")
    public Boolean deleteFile(@RequestParam("fileName")String fileName)
            throws IOException, FirebaseAuthException{
        if(fileName.equals("")){
            return false;
        }
        return fireBaseService.delete(fileName);
    }
}
