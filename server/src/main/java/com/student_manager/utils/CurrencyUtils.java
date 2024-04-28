package com.student_manager.utils;

import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;

public class CurrencyUtils {
    public static String getCurrencyInNation(Double price) {
        Locale locale = new Locale("vi","VN");
        Currency currency = Currency.getInstance(locale);
        NumberFormat format = NumberFormat.getCurrencyInstance(locale);
        format.setCurrency(currency);
        return  format.format(price);
    }

    public static String getCurrencyInNationVN(Double price) {
        return String.format("%,.0f", price);
    }
}
