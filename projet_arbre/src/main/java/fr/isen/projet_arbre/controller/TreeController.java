package fr.isen.projet_arbre.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.isen.projet_arbre.model.Tree;
import fr.isen.projet_arbre.service.TreeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/trees")
public class TreeController {
    private final TreeService treeService;
    public TreeController(TreeService treeService) {
        this.treeService = treeService;
    }

    @CrossOrigin(origins = "http://localhost:8000")
    @GetMapping
    public ResponseEntity<List<Tree>> getAllTrees() {
        List<Tree> trees = treeService.getAllTrees();
        return new ResponseEntity<>(trees, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:8000")
    @GetMapping("/quartier")
    public ResponseEntity<List<Tree>> getTreeByQuartier(String quartier) {
        List<Tree> trees = treeService.getTreeByQuartier(quartier);
        return new ResponseEntity<>(trees, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:8000")
    @GetMapping("/secteur")
    public ResponseEntity<List<Tree>> getTreeBySecteur(String secteur) {
        List<Tree> trees = treeService.getTreeBySecteur(secteur);
        return new ResponseEntity<>(trees, HttpStatus.OK);
    }
    
    @CrossOrigin(origins = "http://localhost:8000")
    @GetMapping("/etat")
    public ResponseEntity<List<Tree>> getTreeByEtat(String etat) {
        List<Tree> trees = treeService.getTreeByEtat(etat);
        return new ResponseEntity<>(trees, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:8000")
    @PostMapping
    public ResponseEntity<Tree> addTree(@RequestBody Tree entity) {
        Tree newTree = treeService.addTree(entity);
        return new ResponseEntity<>(newTree, HttpStatus.CREATED);
    }
    
    @CrossOrigin(origins = "http://localhost:8000")
    @PutMapping("/{identifiant}")
    public ResponseEntity<Tree> updateTree(@PathVariable Long identifiant, @RequestBody Tree entity) {
        Tree updatedTree = treeService.updateTree(identifiant, entity);
        return new ResponseEntity<>(updatedTree, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:8000")
    @DeleteMapping("/{identifiant}")
    public ResponseEntity<Void> deleteTree(@PathVariable Long identifiant) {
        treeService.deleteTree(identifiant);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
