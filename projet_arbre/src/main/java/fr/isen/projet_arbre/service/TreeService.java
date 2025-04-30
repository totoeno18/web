package fr.isen.projet_arbre.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.isen.projet_arbre.model.Tree;
import fr.isen.projet_arbre.repository.TreeRepository;

@Service
public class TreeService {
    private final TreeRepository treeRepository;
    public TreeService(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }

    public List<Tree> getAllTrees() {
        return treeRepository.findAll();
    }
}
