package com.student_manager.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Locale;

@Component
public class Translator {
	private final MessageSource messageSource;

	@Autowired
	private Translator(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	public String toLocale(String msgCode, String lang) {
		Locale locale = new Locale(lang);
		return this.messageSource.getMessage(msgCode, null, locale);
	}

	public String toLocale(String msgCode) {
		Locale locale = LocaleContextHolder.getLocale();
		return this.messageSource.getMessage(msgCode, null, locale);
	}

	public String toLocaleByFormatString(String msgCode, Object... msg) {
		Locale locale = LocaleContextHolder.getLocale();
		return String.format(this.messageSource.getMessage(msgCode, null, locale), msg);
	}

	public String toLocaleByFormatStringVi(String msgCode, Object... msg) {
		Locale locale = new Locale("vi");
		return String.format(this.messageSource.getMessage(msgCode, null, locale), msg);
	}

	public String formatLocalizedMessage(String messageKey, Object... args) {
		String template = toLocale(messageKey, "vi");
		return MessageFormat.format(template, args);
	}
}
