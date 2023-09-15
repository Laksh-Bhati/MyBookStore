package com.MyApplication.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.MyApplication.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
}
