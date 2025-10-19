package com.esplit.backend.settlement;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.group.GroupRepo;
import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        GroupEntity g = groupRepo.findById(s.getGroup().getId()).orElseThrow();
        User from = userRepo.findById(s.getFromUser().getId()).orElseThrow();
        User to = userRepo.findById(s.getToUser().getId()).orElseThrow();

        s.setGroup(g);
        s.setFromUser(from);
        s.setToUser(to);
        return settlementRepo.save(s);
    }
}