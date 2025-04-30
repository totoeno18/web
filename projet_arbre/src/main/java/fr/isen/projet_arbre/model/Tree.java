package fr.isen.projet_arbre.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tree")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long identifiant;

    @Column(name = "quartier")
    private String quartier;

    @Column(name = "secteur")
    private String secteur;

    @Column(name = "hauteur")
    private float hauteur;

    @Column(name = "diametre")
    private int diametre;

    @Column(name = "longitude")
    private float longitude;

    @Column(name = "latitude")
    private float latitude;

    @Column(name = "age")
    private float age;

    @Column(name = "etat")
    private String etat;
}
