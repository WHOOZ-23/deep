package com.basic.deep.member.service;

import com.basic.deep.member.dto.*;

import java.util.List;
import java.util.Optional;

public interface MemberService {


    // 회원가입
    MemberSignUpResponseDTO memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO);

    // 회원가입시 ID 중복검사
    Boolean memberIdCheck(MemberIdCheckRequestDTO memberIdCheckRequestDTO);

    // 일반 로그인
    // memberNo == Long == Token을 받아오므로 그냥 Long 으로 받는다.
    // 더불어, ResponseDTO가 따로 없기 때문이기도 하다.
    Long memberLogin(MemberLoginRequestDTO memberLoginRequestDTO);

    // 일반 로그인 시, refresh Token 저장하기
    void memberNormalLoginRefreshToken(Long memberNo, String memberToken);

    // ID 찾기
    List<MemberIdFindResponseDTO> idFind(MemberIdFindRequestDTO memberIdFindRequestDTO);

    // PW 찾기
    String memberPwFind(MemberPwFindRequsetDTO memberPwFindRequsetDTO, String memberPass);

    // info 조회
    MemberInfoResponseDTO memberInfo(Long memberNo);

    // 커뮤니티 내 프로필 수정
    MemberModifyResponseDTO memberModify(MemberModifyRequestDTO memberModifyRequestDTO, Long memberNo);

    // 개인 프로필 편집 - 비밀번호 변경
    MemberModifyPassResponseDTO memberModifyPass(MemberModifyPassRequestDTO memberModifyPassRequestDTO, Long memberNo);

    // 개인 프로필 편집 - 메일 변경
    MemberModifyMailResponseDTO memberModifyMail(MemberModifyMailRequestDTO memberModifyMailRequestDTO, Long memberNo);

    // 개인 프로필 편집 - 주소 변경
    MemberModifyAddressResponseDTO memberModifyAddress(MemberModifyAddressRequestDTO memberModifyAddressRequestDTO, Long memberNo);

    // 개인 프로필 편집 - 휴대폰 번호 변경
    MemberModifyPhoneResponseDTO memberModifyPhone(MemberModifyPhoneRequestDTO memberModifyPhoneRequestDTO , Long memberNo);

}
