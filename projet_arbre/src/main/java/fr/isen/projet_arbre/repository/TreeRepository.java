package fr.isen.projet_arbre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.isen.projet_arbre.model.Tree;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {

    List<Tree> findByQuartier(String quartier);
    List<Tree> findBySecteur(String secteur);
    List<Tree> findByEtat(String etat);
    Tree save(String entity);
    void deleteById(Long identifiant);

}
