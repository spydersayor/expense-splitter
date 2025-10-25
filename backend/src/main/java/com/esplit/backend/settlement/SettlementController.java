package com.esplit.backend.settlement;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.group.GroupRepo;
import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/settlements")
@RequiredArgsConstructor
public class SettlementController {
    private final SettlementRepo settlementRepo;
    private final UserRepo userRepo;
    private final GroupRepo groupRepo;

    @GetMapping("/{groupId}")
    public List<Settlement> getGroupSettlements(@PathVariable Long groupId) {
        return settlementRepo.findByGroupId(groupId);
    }

    @PostMapping
    public Settlement create(@RequestBody Settlement s) {
    GroupEntity g = groupRepo.findById(s.getGroup().getId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
    User from = userRepo.findById(s.getFromUser().getId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "From user not found"));
    User to = userRepo.findById(s.getToUser().getId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "To user not found"));

    s.setGroup(g);
    s.setFromUser(from);
    s.setToUser(to);
    return settlementRepo.save(s);
    }
}