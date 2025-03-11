package com.email.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        log.info("✅ WebClient.Builder Bean Initialized");
        return WebClient.builder();
    }

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        log.info("✅ WebClient Bean Initialized");
        return builder
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}