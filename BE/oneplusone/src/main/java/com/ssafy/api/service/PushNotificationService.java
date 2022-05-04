package com.ssafy.api.service;

import java.io.IOException;

public interface PushNotificationService {
    public void sendCommonMessage(String title, String body) throws IOException;
}
