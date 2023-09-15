package com.MyApplication.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.MyApplication.entity.OrderDetail;
import com.MyApplication.entity.User;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer> {
	
	public List<OrderDetail> findByUser(User user);

}
