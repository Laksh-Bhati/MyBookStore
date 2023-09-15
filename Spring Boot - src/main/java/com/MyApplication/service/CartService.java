package com.MyApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyApplication.configuration.JwtRequestFilter;
import com.MyApplication.dao.CartDao;
import com.MyApplication.dao.ProductDao;
import com.MyApplication.dao.UserDao;
import com.MyApplication.entity.Cart;
import com.MyApplication.entity.Product;
import com.MyApplication.entity.User;

@Service
public class CartService {
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao; 
	
	public Cart addToCart(Integer productId) {
		Product product = productDao.findById(productId).get();
		
		String username = JwtRequestFilter.CURRENT_USER;
		User user = null;
		if(username != null) {
			user = userDao.findById(username).get();
		}
		
		if(product != null && user != null) {
			Cart cart = new Cart(product, user);
			return cartDao.save(cart);
		}
		return null;
	}

}
