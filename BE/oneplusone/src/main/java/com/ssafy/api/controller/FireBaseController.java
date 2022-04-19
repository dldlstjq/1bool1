package com.ssafy.api.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.api.service.FireBaseService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "firebase API", tags = {"FIREBASE"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/firebase")
public class FireBaseController {

    @Autowired
    FireBaseService fireBaseService;

    @PostMapping("/files")
    public String uploadFile(@RequestPart("file")MultipartFile file/*, String nameFile*/)
            throws IOException, FirebaseAuthException{
        if(file.isEmpty()){
            return "is empty";
        }
        return fireBaseService.upload(file);
    }
}