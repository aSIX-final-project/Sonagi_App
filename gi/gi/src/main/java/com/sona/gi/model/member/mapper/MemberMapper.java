package com.sona.gi.model.member.mapper;

import com.sona.gi.model.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

        int regist(MemberDto memberDto);

}
