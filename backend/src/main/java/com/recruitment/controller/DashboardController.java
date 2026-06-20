package com.recruitment.controller;

import com.recruitment.common.Result;
import com.recruitment.model.DashboardStats;
import com.recruitment.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public Result<DashboardStats> getStats() {
        return Result.success(dashboardService.getStats());
    }
}
