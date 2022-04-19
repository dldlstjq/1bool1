package com.ssafy.api.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.api.service.FireBaseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "firebase API", tags = {"FIREBASE"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/firebase")
public class FireBaseController {

    @Autowired
    FireBaseService fireBaseService;

    @ApiOperation(value = "firebase Storage에 업로드", notes = "정상업로드되면 url 반환")
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file")MultipartFile file)
        throws IOException, FirebaseAuthException{
        if(file.isEmpty()){
            return "is empty";
        }
        return fireBaseService.upload(file);
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
