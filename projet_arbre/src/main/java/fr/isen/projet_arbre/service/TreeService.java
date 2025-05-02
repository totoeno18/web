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

    public List<Tree> getTreeByQuartier(String quartier) {
        return treeRepository.findByQuartier(quartier);
    }

    public List<Tree> getTreeBySecteur(String secteur) {
        return treeRepository.findBySecteur(secteur);
    }

    public List<Tree> getTreeByEtat(String etat) {
        return treeRepository.findByEtat(etat);
    }

    public Tree addTree(Tree entity) {
        return treeRepository.save(entity);
    }

    public Tree updateTree(Long identifiant, Tree entity) {
        return treeRepository.findById(identifiant)
                .map(tree -> {
                    tree.setQuartier(entity.getQuartier());
                    tree.setSecteur(entity.getSecteur());
                    tree.setHauteur(entity.getHauteur());
                    tree.setDiametre(entity.getDiametre());
                    tree.setLongitude(entity.getLongitude());
                    tree.setLatitude(entity.getLatitude());
                    tree.setAge(entity.getAge());
                    tree.setEtat(entity.getEtat());
                    return treeRepository.save(tree);
                })
                .orElseThrow(() -> new RuntimeException("Tree not found with id " + identifiant));
    }

    public void deleteTree(Long identifiant) {
        treeRepository.deleteById(identifiant);
    }
}
