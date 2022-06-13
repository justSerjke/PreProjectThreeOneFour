package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public String allUsers(Model model) {
        model.addAttribute("allRoles", roleService.getAllRoles());
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("user", userService.getUserInfo());
        return "html/admin";
    }

//    @PostMapping("/add")
//    public String addUser(@ModelAttribute User user, @RequestParam(value = "roleNames") String[] roleNames) {
//        user.setRoles(roleService.getRoleSet(roleNames));
//        userService.saveUser(user);
//        return "redirect:/html/admin";
//    }

    @GetMapping("/user")
    public String getUserPage(Model model) {
        model.addAttribute("user", userService.getUserInfo());
        return "html/adminUser";
    }

//    @PutMapping(value = "/edit/{id}")
//    public String editUser(@ModelAttribute User user, @RequestParam(value = "roleNames") String[] roleNames) {
//        user.setRoles(roleService.getRoleSet(roleNames));
//        userService.saveUser(user);
//        return "redirect:/html/admin";
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public String deleteUser(@PathVariable("id") long id) {
//        userService.deleteById(id);
//        return "redirect:/html/admin";
//    }

}
