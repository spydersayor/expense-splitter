package com.esplit.backend.auth;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;   // 👈 yeh import karna
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,     // 👈 annotations added
            @NonNull HttpServletResponse response,
            @NonNull FilterChain chain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.info("No Authorization header or not Bearer; path={} method={}", request.getRequestURI(), request.getMethod());
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String tokenPrefix = token.length() > 8 ? token.substring(0, 8) + "..." : token;
        
        String username;
        try {
            username = jwtService.extractUsername(token);
        } catch (Exception e) {
            log.warn("Invalid JWT token format for path={} method={}, error: {}", request.getRequestURI(), request.getMethod(), e.getMessage());
            chain.doFilter(request, response);
            return;
        }
        log.info("Found Bearer token prefix='{}' for path={} method={}", tokenPrefix, request.getRequestURI(), request.getMethod());

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            var userDetails = userDetailsService.loadUserByUsername(username);
            boolean valid = jwtService.isTokenValid(token);
            log.info("Token validation for user='{}' valid={}", username, valid);

            if (valid) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.info("SecurityContext set for user='{}' path={}", username, request.getRequestURI());
            }
        }
        chain.doFilter(request, response);
    }
}