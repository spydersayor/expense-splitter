package com.esplit.backend.group;

import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.esplit.backend.user.UserDto;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupRepo groupRepo;
    private final UserRepo userRepo;

    private UserDto toUserDto(User u) {
        if (u == null) return null;
        return new UserDto(u.getId(), u.getName(), u.getEmail());
    }

    private GroupDto toGroupDto(GroupEntity g) {
        GroupDto dto = new GroupDto();
        dto.setId(g.getId());
        dto.setName(g.getName());
        dto.setCreatedAt(g.getCreatedAt());
        dto.setCreatedBy(toUserDto(g.getCreatedBy()));
        dto.setMembers(g.getMembers().stream().map(this::toUserDto).toList());
        return dto;
    }

    @GetMapping
    public List<GroupDto> allGroups() {
        return groupRepo.findAllWithMembers().stream().map(this::toGroupDto).toList();
    }

    @GetMapping("/{groupId}")
    public GroupDto getGroup(@PathVariable Long groupId) {
        GroupEntity group = groupRepo.findByIdWithMembers(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
        return toGroupDto(group);
    }

    @PostMapping
    public GroupDto createGroup(@RequestBody GroupEntity g,
                                   @AuthenticationPrincipal UserDetails principal) {
        User creator = userRepo.findByEmail(principal.getUsername()).orElseThrow();
        g.setCreatedBy(creator);
        g.getMembers().add(creator); // add creator to members
        GroupEntity saved = groupRepo.save(g);
        return toGroupDto(groupRepo.findByIdWithMembers(saved.getId()).orElse(saved));
    }

    @PostMapping("/{groupId}/members")
    public GroupDto addMember(@PathVariable Long groupId, @RequestBody AddMemberRequest request) {
        GroupEntity group = groupRepo.findByIdWithMembers(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
    User member = userRepo.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (!group.getMembers().contains(member)) {
            group.getMembers().add(member);
            group = groupRepo.save(group);
        }
        return toGroupDto(group);
    }
}