package com.sona.gi.controller.restaurant;

import com.sona.gi.model.rank.dto.RankDto;
import com.sona.gi.model.restaurant.dto.RestaurantDto;
import com.sona.gi.service.rank.RankService;
import com.sona.gi.service.restaurant.RestaurantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/boot/restaurant")
public class RestaurantController {
    Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private RestaurantService restaurantService;


    @PostMapping("/regist")
    public HashMap<String, Object> regist(@RequestBody RestaurantDto restaurantDto){
        HashMap<String,Object> mv = new HashMap<>();

        int resultCnt = restaurantService.regist(restaurantDto);
        mv.put("result",resultCnt);
        return mv;
    }

    //    @RequestMapping(method = RequestMethod.POST, path = "/postMethod")
    // 아래랑 동일
    @GetMapping("/findAll")
    public HashMap<String,Object> findAll(){
        HashMap<String,Object> mv = new HashMap<>();
        List<RestaurantDto> list = restaurantService.findAll();
        mv.put("list",list);
        return mv;
    }

    //검색 get, 수정 삭제 post
    @PostMapping("/modify")
    public HashMap<String,Object> modify(@RequestBody RestaurantDto restaurantDto){
        HashMap<String,Object> mv = new HashMap<>();
        int resultCnt= restaurantService.modify(restaurantDto);
        mv.put("resultCnt",resultCnt);
        return mv;
    }

    @PostMapping("/delete")
    public HashMap<String,Object> delete(@RequestBody RestaurantDto restaurantDto){
        HashMap<String,Object> mv = new HashMap<>();
        int resultCnt= restaurantService.delete(restaurantDto);
        mv.put("resultCnt",resultCnt);
        return mv;
    }
}
