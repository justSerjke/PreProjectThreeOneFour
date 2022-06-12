package ru.kata.spring.boot_security.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserRepository userRepository, RoleRepository roleRepository) {
        return (args) -> {
            Role admin = roleRepository.save(new Role("ROLE_ADMIN"));
            Role user = roleRepository.save(new Role("ROLE_USER"));

            User user1 = new User("Sergey", "Fedorov", "sf@gmail.com");
            user1.setPassword(new BCryptPasswordEncoder().encode("sf"));
            user1.setRoles(Stream.of(admin, user).collect(Collectors.toSet()));
            userRepository.save(user1);

            User user2 = new User("Elena", "Levitskikh", "el@mail.ru");
            user2.setPassword(new BCryptPasswordEncoder().encode("el"));
            user2.setRoles(Stream.of(user).collect(Collectors.toSet()));
            userRepository.save(user2);

            User user3 = new User("Mentor", "Mentorov", "mm@yandex.ru");
            user3.setPassword(new BCryptPasswordEncoder().encode("mm"));
            user3.setRoles(Stream.of(user).collect(Collectors.toSet()));
            userRepository.save(user3);
        };
    }
}
