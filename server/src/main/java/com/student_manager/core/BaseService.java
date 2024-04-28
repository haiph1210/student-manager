package com.student_manager.core;

import com.student_manager.utils.Translator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

@Component
public abstract class BaseService {
    @Autowired
    protected LocaleResolver localeResolver;
    @Autowired
    protected Translator translator;


    protected String getLocaleFromRequest(HttpServletRequest request) {
        Locale locale = localeResolver.resolveLocale(request);
        return locale.toString();
    }

    protected String getLocal() {
        return "vi";
    }
}
