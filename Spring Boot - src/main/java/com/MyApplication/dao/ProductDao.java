package com.MyApplication.dao;


import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.MyApplication.entity.Product;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer>{
	
	public List<Product> findAll(Pageable pageable);

	public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
			String keyOne, String keyTwo, Pageable pageable);
}
