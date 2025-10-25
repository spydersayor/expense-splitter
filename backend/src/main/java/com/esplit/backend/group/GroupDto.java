package com.esplit.backend.group;

import com.esplit.backend.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto {
    private Long id;
    private String name;
    private UserDto createdBy;
    private Instant createdAt;
    private List<UserDto> members;
}
