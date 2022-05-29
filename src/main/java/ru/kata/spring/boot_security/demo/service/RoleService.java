package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Collection;
import java.util.List;


public interface RoleService {

    void addRole(Role role);

    void updateRole(Role role);

    Role getRoleById(long id);

    Role getRoleByName(String name);

    List<Role> getAllRoles();

    Collection<Role> getRoleSet(String[] roleName);

}
