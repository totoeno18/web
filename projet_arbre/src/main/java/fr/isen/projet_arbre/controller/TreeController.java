package fr.isen.projet_arbre.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.isen.projet_arbre.model.Tree;
import fr.isen.projet_arbre.service.TreeService;

@RestController
@RequestMapping("/api/trees")
public class TreeController {
    private final TreeService treeService;
    public TreeController(TreeService treeService) {
        this.treeService = treeService;
    }

    @GetMapping
    public ResponseEntity<List<Tree>> getAllTrees() {
        List<Tree> trees = treeService.getAllTrees();
        return new ResponseEntity<>(trees, HttpStatus.OK);
    }
}
