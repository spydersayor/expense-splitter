package com.esplit.backend.settlement;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.group.GroupRepo;
import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/api/settlements")
@RequiredArgsConstructor
public class SettlementController {
    private final SettlementRepo settlementRepo;
    private final UserRepo userRepo;
    private final GroupRepo groupRepo;

    private SettlementDto toSettlementDto(Settlement settlement) {
        SettlementDto dto = new SettlementDto();
        dto.setId(settlement.getId());
        dto.setGroupId(settlement.getGroup().getId());
        dto.setGroupName(settlement.getGroup().getName());
        dto.setFromUserId(settlement.getFromUser().getId());
        dto.setFromUserName(settlement.getFromUser().getName());
        dto.setFromUserEmail(settlement.getFromUser().getEmail());
        dto.setToUserId(settlement.getToUser().getId());
        dto.setToUserName(settlement.getToUser().getName());
        dto.setToUserEmail(settlement.getToUser().getEmail());
        dto.setAmount(settlement.getAmount());
        dto.setSettledAt(settlement.getSettledAt());
        dto.setNote(settlement.getNote());
        return dto;
    }

    @GetMapping("/{groupId}")
    @Transactional(readOnly = true)
    public List<SettlementDto> getGroupSettlements(@PathVariable Long groupId) {
        return settlementRepo.findByGroupId(groupId).stream()
                .map(this::toSettlementDto)
                .toList();
    }

    @PostMapping
    @Transactional
    public SettlementDto create(@RequestBody CreateSettlementRequest request) {
        GroupEntity group = groupRepo.findById(request.getGroupId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
        User fromUser = userRepo.findById(request.getFromUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "From user not found"));
        User toUser = userRepo.findById(request.getToUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "To user not found"));

        Settlement settlement = new Settlement();
        settlement.setGroup(group);
        settlement.setFromUser(fromUser);
        settlement.setToUser(toUser);
        settlement.setAmount(request.getAmount());
        settlement.setNote(request.getNote());
        
        Settlement saved = settlementRepo.save(settlement);
        return toSettlementDto(saved);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void delete(@PathVariable Long id) {
        Settlement settlement = settlementRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Settlement not found"));
        settlementRepo.delete(settlement);
    }
}
