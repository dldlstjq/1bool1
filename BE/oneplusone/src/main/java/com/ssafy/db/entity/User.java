package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity{
    @Column(name = "email", nullable = false)
    String email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "nickname",nullable = false)
    String nickname;

    @Column(name = "is_withdrawal")
    Integer isWithdrawal;

    @Column(name = "is_manager")
    Integer isManager;

    @Column(name = "is_alarm")
    Integer isAlarm;

    public void update(String email, String password, String nickname,Integer isWithdrawal,Integer isAlarm) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.isWithdrawal = isWithdrawal;
        if(this.isAlarm == null ||this.isAlarm == 0){
            this.isAlarm = 1;
        }else{
            this.isAlarm = 0;
        }
    }

    @Builder
    public User(Long id, String email, String password, String nickname,Integer isWithdrawal){
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.isWithdrawal = isWithdrawal;
    }

}
