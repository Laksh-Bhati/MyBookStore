package com.MyApplication.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.MyApplication.entity.Cart;
import com.MyApplication.entity.User;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer>{
	
//	public List<Cart> findB	yUser(User user);

}
