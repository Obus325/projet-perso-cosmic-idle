# **Cahier des charges – Jeu idle cosmiques**

## **1\. Présentation générale**

Ce projet consiste à développer un **jeu de type “idle” ou “incrémental”**, c’est-à-dire un jeu où le joueur accumule automatiquement des ressources au fil du temps.

La thématique choisie : un voyage de l’infiniment petit à l’infiniment grand. Le joueur commence avec des particules élémentaires et construit progressivement des structures de plus en plus grandes.

Le jeu doit être accessible et tout public : une interface simple, un système de progression clair, et une boucle de jeu addictive reposant sur l’accumulation et les redémarrages (“prestiges”).

---

## **2\. Mécanismes de gameplay**

### **2.0 Vocabulaire**

Ici : 

* A représente les atomes  
* B représente les nébuleuses  
* C représente les étoiles  
* D représente les galaxies

### **2.1 Ressources principales**

* **Particules** : ressource de base, générée passivement.

* **A, B, C, D** : entités hiérarchisées.

Chaque entité (A, B, C, D) est **achetée directement en échange de Particules**, ce qui permet au joueur de construire sa production de plusieurs façons.

### 

### **2.2 Progression**

* Le joueur commence avec juste assez de particule pour acheter un exemplaire de A.

* Il améliore progressivement ses ressources.  
* Enfin, le joueur accède à de nouveaux onglets permettant d’atteindre une production toujours plus grande.

### **2.3 Automatisation**

* Initialement, le joueur doit cliquer et acheter manuellement.

* Rapidement, il peut débloquer des **“robots”** qui automatisent certains achats ou actions précises.

* L’objectif est que le jeu “joue tout seul”, mais toujours de manière optimisée par les choix du joueur.

### **2.4 Equilibre de l’univers**

les achats du joueurs doivent avoir un impact direct sur l’univers

* calcul de la densité de l’univers  
* modification de la production en fonction de l’équilibre

	afin de faciliter la gestion du cosmos, le joueur a à sa disposition plusieurs outils : 

* augmenter la taille de l’univers  
* diminuer la masse de ses objets  
* augmenter le maximum de densité acceptée

	

	en plus des améliorations permettant de simplifier l’équilibre, la densité permet d’obtenir: 

* de l’automatisation (2.3)  
* les challenges (4)

---

## **3\. Systèmes de prestige ou rédemarrage**

### **3.1 Premier prestige – Crunch**

* Lorsque la génération de ressources atteint un stade avancé, le joueur atteint une peut réinitialiser toute la progression accumulée lors de cette première phase .

* En échange, il obtient des **Essences du Vide**, une nouvelle ressource plus puissante.

* Ces Essences permettent d’acheter de nouvelles **améliorations plus efficaces**: bonus de production, automatisation avancée, conversions plus efficaces.  
    
* Le joueur atteint également des **“milestones”** selon le nombre de crunchs effectués qui permettent de simplifier le retour au crunch (ex : conserver les robots qui automatisent)

### **3.2 Deuxième prestige – Multivers**

* Après plusieurs cycles de Crunch, le joueur débloque le **Multivers**.

* Ce reset est encore plus profond : il efface même les Essences du Vide.

* En échange, le joueur reçoit des **Fragments de Multivers**, extrêmement puissants.

* Ils donnent accès à des **styles d’univers** (univers denses, lumineux, froids) qui offrent des spécialisations et augmentent la rejouabilité.

---

## **4\. Challenges**

* **Barres de progression** pour la ressource principale de la phase.  
* **défi complexe** : suppression d’une ressource, réduction des bonus, contrainte de jeu…   
* **récompenses variées** :

  * nouveau robot d’automatisation  
  * Améliorations  
  * etc

---

## **5\. Interface utilisateur (UI)**

* **Barres de progression** pour chaque ressource (Particules, A, B, C, D).

* **Boutons lisibles** pour toutes les interactions  
* **Sections séparés** :

  * Ressources principales

  * Améliorations/automatisations

  * Arbres de méta-améliorations (Crunch, Multivers)

* **Statistiques** : production par seconde, progression historique, records par réinitialisation.

---

## **Diagramme de classes**

Chaque classe “primaire” (Upgrades, Ressources, Entités, Robots) contient les informations basiques du gameplay

Toutes ces informations sont ensuite acheminées dans la classe Jeu qui effectue les calculs et s’occupe entièrement du Gameplay.

---

## **7\. Contraintes techniques**

* Jeu conçu pour être **accessible via navigateur web** (PC, mobile). Les technologies utilisées seront le HTML/CSS et le Javascript.

* Sauvegarde automatique

* Interface lisible, minimaliste, adaptée aux longues sessions.

* Le jeu doit rester fluide et lisible même avec de très grandes quantités de ressources (usage de notations scientifiques pour les grands nombres).

---

## **8\. inspiration**

le jeu s’inspire librement de plusieurs autre jeu du genre

* antimatter dimensions  
* revolution idle  
* cookie clicker  
* etc…

---

## **9\. Objectif final**

À l’issue des 7 mois de développement, le jeu doit proposer :

* Une boucle complète et passionnante.

* Des réinitialisations stratégiques (système de prestiges).

* Une progression longue durée avec rejouabilité.

* Une interface claire, stable et agréable.  
    
* Le jeu sera livré avec une documentation et des tests unitaires seront effetués