package fr.isen.projet_arbre.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.isen.projet_arbre.model.Tree;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {
}
