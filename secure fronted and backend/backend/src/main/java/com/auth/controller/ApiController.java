package com.auth.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/user/dashboard")
    public Map<String, String> userDashboard(Authentication auth) {
        return Map.of(
            "message", "Welcome to User Dashboard",
            "user", auth.getName()
        );
    }

    @GetMapping("/admin/dashboard")
    public Map<String, String> adminDashboard(Authentication auth) {
        return Map.of(
            "message", "Welcome to Admin Dashboard",
            "user", auth.getName(),
            "privilege", "Full system access"
        );
    }

    @GetMapping("/admin/users")
    public Map<String, Object> listUsers() {
        return Map.of(
            "users", new String[]{"admin", "user"},
            "total", 2
        );
    }
}
