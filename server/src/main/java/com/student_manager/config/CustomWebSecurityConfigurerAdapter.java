//package com.haiph.yang_kang_solution.config;
//
//import com.shop_quan_ao.server.exception.AuthExceptionHandler;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class CustomWebSecurityConfigurerAdapter {
//    @Value("${security.api.ignores}")
//    private String[] ignores;
//    private final List<String> ignoresDefault = Arrays.asList("/v2/api-docs/**", "/v3/api-docs/**", "/configuration/ui/**", "/swagger-resources/**", "/configuration/security/**",
//
//            "/swagger-ui/**", "/webjars/**", "/swagger-resources/configuration/ui/**");
//
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http, AuthExceptionHandler authExceptionHandler) throws Exception {
//        return http
//                .csrf().disable()
//                .cors(withDefaults())
//                .exceptionHandling(handler -> handler
//                        .authenticationEntryPoint(authExceptionHandler)
//                        .accessDeniedHandler(authExceptionHandler)
//                )
//                .authorizeHttpRequests(auth -> auth
//                        .antMatchers("/auth/**","/files/**").permitAll()
//                        .antMatchers("/v2/api-docs/**", "/v3/api-docs/**", "/configuration/ui/**", "/swagger-resources/**", "/configuration/security/**",
//                                "/swagger-ui/**", "/webjars/**", "/swagger-resources/configuration/ui/**").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .httpBasic(withDefaults())
//                .build();
//    }
//
//    @Bean
//    public AuthenticationManager authManager(HttpSecurity http, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class)
//                .userDetailsService(userDetailsService)
//                .passwordEncoder(passwordEncoder)
//                .and()
//                .build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}