package com.email;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.email")
public class EmailWriterSbApplication {
	public static void main(String[] args) {
		SpringApplication.run(EmailWriterSbApplication.class, args);
	}

}
