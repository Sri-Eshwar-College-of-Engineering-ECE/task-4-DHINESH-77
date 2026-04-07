package com.auth.controller;

import com.auth.model.User;
import com.auth.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    // In-memory users (replace with DB in production)
    private final Map<String, User> users = Map.of(
        "admin", new User("admin", "admin123", "ROLE_ADMIN"),
        "user",  new User("user",  "user123",  "ROLE_USER")
    );

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        User user = users.get(username);
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(username, user.getRole());
        return ResponseEntity.ok(Map.of(
            "token", token,
            "role", user.getRole(),
            "username", username
        ));
    }
}
