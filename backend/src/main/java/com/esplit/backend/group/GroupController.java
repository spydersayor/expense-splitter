package com.esplit.backend.group;

import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupRepo groupRepo;
    private final UserRepo userRepo;

    @GetMapping
    public List<GroupEntity> allGroups() {
        return groupRepo.findAll();
    }

    @PostMapping
    public GroupEntity createGroup(@RequestBody GroupEntity g,
                                   @AuthenticationPrincipal UserDetails principal) {
        User creator = userRepo.findByEmail(principal.getUsername()).orElseThrow();
        g.setCreatedBy(creator);
        g.getMembers().add(creator); // add creator to members
        return groupRepo.save(g);
    }

    @PostMapping("/{groupId}/members")
    public GroupEntity addMember(@PathVariable Long groupId, @RequestBody AddMemberRequest request) {
        GroupEntity group = groupRepo.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
        User member = userRepo.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (!group.getMembers().contains(member)) {
            group.getMembers().add(member);
            return groupRepo.save(group);
        }
        return group;
    }
}