package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BoardSearchRequestDTO {
    private String keyword;
    private int page;
}
