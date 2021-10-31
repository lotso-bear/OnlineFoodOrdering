package com.laioffer.onlineorder.controller;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.laioffer.onlineorder.entity.Cart;
import com.laioffer.onlineorder.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CartController {
    @Autowired
    CartService cartService;

    @RequestMapping(value = "/cart", method = RequestMethod.GET)
    @ResponseBody
    public Cart getCart(){
        return cartService.getCart();
    }
}
