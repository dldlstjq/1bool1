package com.ssafy.api.service;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.StorageClient;


@Service
public class FireBaseService {

    @Value("${firebase-bucket}")
    private String firebaseBucket;
    @Value("${fire-configuration-file}")
    private String firebaseConfigPath;
//    final ResponseService responseService;


//    public String uploadFiles(MultipartFile file, String nameFile)
//            throws IOException, FirebaseAuthException{
//        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
//        InputStream content = new ByteArrayInputStream(file.getBytes());
//        Blob blob = bucket.create(nameFile.toString(), content, file.getContentType());
//        return blob.getMediaLink();
//    }

    String DOWNLOAD_URL = "https://storage.cloud.google.com/oneplusone-dfc60.appspot.com";
    private String uploadFile(File file, String fileName) throws IOException {
        BlobId blobId = BlobId.of("oneplusone-dfc60.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream());
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, "UTF-8"));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public String upload(MultipartFile multipartFile) {

        try {
            String fileName = multipartFile.getOriginalFilename();                        // to get original file name
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));  // to generated random string values for file name.

            File file = this.convertToFile(multipartFile, fileName);                      // to convert multipartFile to File
            String TEMP_URL = this.uploadFile(file, fileName);                                   // to get uploaded file link
            file.delete();                                                                // to delete the copy of uploaded file stored in the project folder
            return TEMP_URL+"/"+fileName;                     // Your customized response
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

    }
}