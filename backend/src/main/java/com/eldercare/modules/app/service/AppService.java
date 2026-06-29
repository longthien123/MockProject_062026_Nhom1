package com.eldercare.modules.app.service;

import org.springframework.stereotype.Service;

@Service
public class AppService implements IAppService {

    @Override
    public String getPing() {
        return "Pong from Nguyen Pham Hoang Vu";
    }

}
