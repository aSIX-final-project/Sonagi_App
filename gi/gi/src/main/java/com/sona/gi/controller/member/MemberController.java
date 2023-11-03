package com.sona.gi.controller.member;

import com.sona.gi.model.member.dto.MemberDto;
import com.sona.gi.service.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/boot/member")
public class MemberController {

    //로그 확인용
    Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private MemberService memberService;


    @PostMapping("/regist")
    @ResponseBody
    public HashMap<String, Object> regist(@RequestBody MemberDto memberDto){
        HashMap<String,Object> mv = new HashMap<>();

        int resultCnt = memberService.regist(memberDto);
        mv.put("result",resultCnt);
        return mv;
    }

}
