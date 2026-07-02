package com.eldercare.modules.app.controller;

import org.springframework.web.bind.annotation.RestController;

import com.eldercare.modules.app.service.IAppService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class AppController {

    private final IAppService appService;

    public AppController(IAppService appService) {
        this.appService = appService;
    }

    @GetMapping("/ping")
    public String getPing(@RequestParam String param) {
        String ping = this.appService.getPing();
        return ping;
    }

}
