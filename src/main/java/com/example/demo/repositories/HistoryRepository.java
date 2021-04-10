package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.history;

public interface HistoryRepository extends JpaRepository<history, Integer> {
	@Query("SELECT max(turn) FROM history")
	Integer turnCount();
	
	@Query("FROM history h ORDER BY h.turn")
	List<history> getAllHistory();
	
	@Query("FROM history h WHERE turn < :turn ORDER BY h.turn ")
	List<history> getHistoryReplayByTurn(@Param("turn")int turn);
	
	@Modifying
	@Transactional
	@Query (nativeQuery = true, value="DELETE FROM history WHERE size = :size")
	void deleteAllBySize(@Param("size")int size);
}
