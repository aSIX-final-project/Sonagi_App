package com.sona.gi.model.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {

    //보육원 DTO

    public String id; //primary key
    public String password;
    //보육원 이름
    public String adName;
    //시설 전화번호
    public String adTel;
    //시설장 이름
    public String managerName; //primary key?
    //개인 전화번호
    public String phoneNum;

    public String address;
    public String homepage;

    //총 인원수 (HC : head count)
    public int totalHc;

    //현재 인원수
    public int currHc;


}
