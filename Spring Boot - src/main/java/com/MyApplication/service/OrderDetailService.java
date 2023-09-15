package com.MyApplication.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.MyApplication.configuration.JwtRequestFilter;
import com.MyApplication.dao.CartDao;
import com.MyApplication.dao.OrderDetailDao;
import com.MyApplication.dao.ProductDao;
import com.MyApplication.dao.UserDao;
import com.MyApplication.entity.Cart;
import com.MyApplication.entity.OrderDetail;
import com.MyApplication.entity.OrderInput;
import com.MyApplication.entity.OrderProductQuantity;
import com.MyApplication.entity.Product;
import com.MyApplication.entity.TransactionDetails;
import com.MyApplication.entity.User;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class OrderDetailService {
	
	private static final String ORDER_PLACED = "Placed";
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	private static final String KEY = "rzp_test_Rpk5tybFhn1bJp";
	private static final String KEY_SECRET = "egFrHu1LwgFW5bRvwe9dAYC1";
	private static final String CURRENCY = "INR";
	
	public List<OrderDetail> getAllOrderDetails() {
		List<OrderDetail> orderDetails = new ArrayList<>();
		orderDetailDao.findAll().forEach(
				x -> orderDetails.add(x)
				);
		return orderDetails;
	}
	
	public List<OrderDetail> getOrderDetails() {
		String currentUser = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(currentUser).get();
		
		return orderDetailDao.findByUser(user);
		
	}
	
	public void placeOrder(OrderInput orderInput) {
		List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();
		
		for (OrderProductQuantity o: productQuantityList) {
			
			Product product = productDao.findById(o.getProductId()).get();
			
			String currentUser = JwtRequestFilter.CURRENT_USER;
			User user = userDao.findById(currentUser).get();
			
			OrderDetail orderDetail = new OrderDetail(
					
					orderInput.getFullName(),
					orderInput.getFullAddress(),
					orderInput.getContactNumber(),
					orderInput.getAlternateContactNumber(),
					ORDER_PLACED,
					product.getProductDiscountedPrice()*o.getQuantity() ,
					product,
					user,
					orderInput.getTransactionId()
					
			);
			
			orderDetailDao.save(orderDetail);
			
		}
		
	}
	
	public void markOrderAsDelivered(Integer orderId) {
		OrderDetail orderDetail = orderDetailDao.findById(orderId).get();
		
		if(orderDetail != null) {
			orderDetail.setOrderStatus("Delivered");
			orderDetailDao.save(orderDetail);
		}
	}
	
	public TransactionDetails createTransaction(Double amount) {
		
		try {
			
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("amount", (amount * 100));
			jsonObject.put("currency", CURRENCY);
			
			RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
			//Razorpay
			Order order = razorpayClient.orders.create(jsonObject);
			
			TransactionDetails transactionDetails = prepareTransactionDetails(order);
			return transactionDetails;
		
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
		
	}
	
	private TransactionDetails prepareTransactionDetails(Order order) {
		String orderId = order.get("id");
		String currency = order.get("currency");
		Integer amount = order.get("amount");
		
		TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount, KEY);
		return transactionDetails;
	}

}
