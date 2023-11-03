package com.sona.gi.service.member;

import com.sona.gi.model.member.dto.MemberDto;
import com.sona.gi.model.member.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

        @Autowired
        private MemberMapper memberMapper;

        @Override
        public int regist(MemberDto memberDto){return memberMapper.regist(memberDto);}
}
