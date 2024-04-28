//package com.haiph.yang_kang_solution.config;
//
//import com.shop_quan_ao.server.repositories.AccountRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.AuditorAware;
//import org.springframework.security.core.context.SecurityContextHolder;
//
//import java.util.Optional;
//
//public class AuditorAwareImpl implements AuditorAware<String> {
//
//    @Autowired
//    private AccountRepository accountRepository;
//
//    public Optional<String> getCurrentAuditor() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        return Optional.ofNullable(accountRepository.findByUsername(username).get().getUsername());
//    }
//}
