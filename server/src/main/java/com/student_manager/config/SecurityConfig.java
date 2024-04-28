//
//import com.shop_quan_ao.server.config.sercurity.AppBasicAuthenticationEntryPoint;
//import com.shop_quan_ao.server.services.impl.CustomUserDetail;
//import com.shop_quan_ao.server.services.impl.CustomUserDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.access.AccessDeniedHandler;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.lang.reflect.Array;
//import java.util.Arrays;
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//    @Value("${security.api.ignores}")
//    private String[] ignores;
//    private List<String> ignoresDefault = Arrays.asList("/v2/api-docs/**", "/v3/api-docs/**", "/configuration/ui/**", "/swagger-resources/**", "/configuration/security/**",
//
//            "/swagger-ui/**", "/webjars/**", "/swagger-resources/configuration/ui/**");
//    @Autowired
//    private CustomUserDetailsService customUserDetail;
//
//    @Bean
//    public static PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//        authenticationProvider.setUserDetailsService(customUserDetail);
//        authenticationProvider.setPasswordEncoder(passwordEncoder());
//        return authenticationProvider;
//    }
//
//    @Bean
//    public AccessDeniedHandler accessDeniedHandler() {
//        return new CustomAccessDeniedHandler();
//    }
//
//    public static class CustomAccessDeniedHandler implements AccessDeniedHandler {
//
//        @Override
//        public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
//            httpServletResponse.setContentType("application/json;charset=UTF-8");
//            httpServletResponse.setStatus(401);
//        }
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().antMatchers(ignores);
//    }
//
//    @Bean
//    public AuthenticationEntryPoint authenticationEntryPoint() {
//        return new AppBasicAuthenticationEntryPoint();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/auth/login").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .httpBasic();
//    }
//
//    //    @Bean
////    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        HttpSecurity httpSecurity = http.headers().disable()
////                .cors().and()
////                .csrf().disable()
////                .logout().disable()
////                .requestCache().disable()
////                .authorizeRequests()
////                .antMatchers("/auth/login").authenticated()
////                .antMatchers("/v2/api-docs/**" ,"/v3/api-docs/**", "/configuration/ui/**", "/swagger-resources/**", "/configuration/security/**",
////
////                        "/swagger-ui/**", "/webjars/**", "/swagger-resources/configuration/ui/**", "/auth/**").permitAll()
////                .antMatchers("/v3/api-docs/**",
////                        "/swagger-ui/**",
////                        "/swagger-ui.html").permitAll()
////                .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
////                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                .and()
////                .httpBasic()
////                .and()
////                .csrf().disable();
////        http.authorizeRequests().anyRequest().authenticated();
////        return httpSecurity.build();
////    }
////    @Bean
////    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        HttpSecurity httpSecurity = http.headers().disable()
////                .cors().and()
////                .csrf().disable()
////                .logout().disable()
////                .requestCache().disable()
////                .authorizeRequests()
////                .antMatchers("/auth/login").authenticated()
////                .antMatchers("/v2/api-docs/**", "/v3/api-docs/**", "/configuration/ui/**", "/swagger-resources/**", "/configuration/security/**",
////
////                        "/swagger-ui/**", "/webjars/**", "/swagger-resources/configuration/ui/**", "/auth/**").permitAll()
////                .antMatchers("/v3/api-docs/**",
////                        "/swagger-ui/**",
////                        "/swagger-ui.html").permitAll()
////                .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
////                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                .and()
////                .httpBasic()
////                .and()
////                .csrf().disable();
////        http.authorizeRequests().anyRequest().authenticated();
////        return httpSecurity.build();
////    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        return customUserDetail;
//    }
//}