package com.MyApplication.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.MyApplication.entity.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

}
