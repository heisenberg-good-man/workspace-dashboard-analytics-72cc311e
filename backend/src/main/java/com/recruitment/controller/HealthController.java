package com.recruitment.controller;

import com.recruitment.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Result<Map<String, Object>> health() {
        return Result.success(Map.of(
                "status", "UP",
                "service", "recruitment-backend",
                "timestamp", java.time.LocalDateTime.now().toString()
        ));
    }
}
