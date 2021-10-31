package com.laioffer.onlineorder.service;

import com.laioffer.onlineorder.dao.ItemOrderDao;
import com.laioffer.onlineorder.entity.Customer;
import com.laioffer.onlineorder.entity.MenuItem;
import com.laioffer.onlineorder.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Order;

@Service
public class ItemOrderService {
    @Autowired
    private MenuInfoService menuInfoService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ItemOrderDao itemOrderDao;

    public void saveOrderItem(int menuId) {
        OrderItem orderItem = new OrderItem();
        MenuItem menuItem = menuInfoService.getMenuItem(menuId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Customer customer = customerService.getCustomer(email);

        orderItem.setMenuItem(menuItem);
        orderItem.setCart(customer.getCart());
        orderItem.setQuantity(1);
        orderItem.setPrice(menuItem.getPrice());

        itemOrderDao.save(orderItem);
    }

}
