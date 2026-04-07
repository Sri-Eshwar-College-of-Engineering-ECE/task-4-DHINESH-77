package com.auth.model;

public class User {
    private String username;
    private String password;
    private String role; // ROLE_USER or ROLE_ADMIN

    public User() {}
    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
}
