#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

CREATE DATABASE projet_arbre;

USE projet_arbre;

#------------------------------------------------------------
# Table: tree
#------------------------------------------------------------

CREATE TABLE tree(
        identifiant    Int  Auto_increment  NOT NULL ,
        quartier       Varchar (50) ,
        secteur        Varchar (50) ,
        hauteur Float ,
        diametre       Int ,
        longitude      Float ,
        latitude       Float ,
        age            Float NOT NULL ,
        etat           Varchar (50) NOT NULL
	,CONSTRAINT tree_PK PRIMARY KEY (identifiant)
)ENGINE=InnoDB;

LOAD DATA LOCAL INFILE
'C:/Users/thoma/OneDrive/Documents/Ecole/CIPA4/Projet_Web_IA_Big_Data/web/arbres_prepared.csv'
INTO TABLE tree
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@clc_quartier,@clc_secteur, @haut_tot, @tronc_diam, @longitude, @latitude, @age_estim, @fk_arb_etat)
SET quartier = @clc_quartier,
secteur = @clc_secteur,
hauteur = @haut_tot,
diametre = @tronc_diam,
longitude = @longitude,
latitude = @latitude,
age = @age_estim,
etat = @fk_arb_etat;