package com.esplit.backend.auth;

import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        if(userRepo.findByEmail(req.getEmail()).isPresent())
            throw new RuntimeException("Email already exists");
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail().toLowerCase());
        u.setPasswordHash(encoder.encode(req.getPassword()));
        userRepo.save(u);
        String token = jwtService.generateToken(u.getEmail(), u.getId());
        return new AuthResponse(token, u.getId(), u.getName(), u.getEmail());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        User u = userRepo.findByEmail(req.getEmail().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if(!encoder.matches(req.getPassword(), u.getPasswordHash()))
            throw new RuntimeException("Invalid credentials");
        String token = jwtService.generateToken(u.getEmail(), u.getId());
        return new AuthResponse(token, u.getId(), u.getName(), u.getEmail());
    }
}