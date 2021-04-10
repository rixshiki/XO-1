package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Orderjson;
import com.example.demo.entities.history;
import com.example.demo.repositories.HistoryRepository;

@Controller

public class XoController {
	@Autowired
	HistoryRepository historyRepo;
	
	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/savesize/{size}")
	public String savesize(
			@PathVariable("size") Integer size) {
		
		historyRepo.deleteAll();
		
		history his = new history();
		if(historyRepo.turnCount() != null) {
			his = historyRepo.getOne(0);
		}
		
		his.setSize(size);
		his.setTurn(0);
		his.setPlayer(0);
		historyRepo.save(his);
		
		return "redirect:/play";
	}
	
	@GetMapping("/play")
	public String play(@ModelAttribute history his, Model model) {
		List<history> historyList = new ArrayList<history>();
		int size = 0, turnCount = 0;
		
		if(historyRepo.turnCount() != null) {
			historyList = historyRepo.getAllHistory();
			size = historyRepo.getOne(0).getSize();
			turnCount = historyRepo.turnCount();
			model.addAttribute("historyList", historyList);
			model.addAttribute("turnCount", turnCount);
		}
		
		model.addAttribute("size", size);
		
		return "play";
	}

	
	@GetMapping("/read/{size}/{i}/{j}")
	public String read(
			@PathVariable("size") Integer size,
			@PathVariable("i") Integer i,
			@PathVariable("j") Integer j) {
		
		history his = new history();
		
		his.setSize(size);
		his.setPositionx(i);
		his.setPositiony(j);
		
		// player1 x
		if(historyRepo.turnCount()%2 == 1) {
			his.setPlayer(1);
		}
		// player2 y
		else if(historyRepo.turnCount()%2 == 0) {
			his.setPlayer(-1);
		}
		
		his.setTurn(historyRepo.turnCount()+1);	
		historyRepo.save(his);
		
		System.out.println(i+j);
		
		return "redirect:/play";
	}
	
	@GetMapping("/clear")
	public String clear() {
		historyRepo.deleteAll();
		return "redirect:/play";
	}
	
	@GetMapping("/listajax")
	@ResponseBody
	public List<history> listajax() {
		List<history> jsList = new ArrayList<history>();
		jsList = historyRepo.getAllHistory();
		return jsList;
	}
	
	@GetMapping("/listajaxreplay/{turn}")
	@ResponseBody
	public List<history> listreplay(@PathVariable("turn") Integer turn) {
		List<history> jsList = new ArrayList<history>();
		jsList = historyRepo.getHistoryReplayByTurn(turn);
		return jsList;
	}
}
