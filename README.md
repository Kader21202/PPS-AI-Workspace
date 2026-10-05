PPS-AI-Workspace
PPS-AI-Workspace est une interface expérimentale conçue pour permettre l'interaction avec les systèmes de la famille PPS, notamment PPS-Maroc.ia-V2.
Le projet constitue la couche d'interaction utilisateur de l'environnement PPS. Il est volontairement séparé du moteur de traitement documentaire et cognitif afin de maintenir une distinction claire entre interface, orchestration des conversations et traitement des connaissances.
Objectif
PPS-AI-Workspace vise à fournir un environnement de travail permettant à l'utilisateur d'interagir avec PPS à travers une interface structurée.
Le Workspace prend notamment en charge :
- Interface utilisateur ;
- Gestion des conversations ;
- Sélection et l'organisation des échanges ;
- Orchestration des requêtes depuis l'interface ;
- Affichage des réponses ;
- Adaptation de l'interface aux différents formats d'écran ;
- Intégration avec PPS-Maroc.ia-V2.
Architecture
Le projet repose sur une architecture React + TypeScript + Vite.
La séparation entre le Workspace et le moteur PPS permet de distinguer plusieurs responsabilités :
Utilisateur
    
PPS-AI-Workspace
   
Contrôle et orchestration de la conversation
   
PPS-Maroc.ia-V2
    
Traitement documentaire et cognitif
    
Réponse
    
PPS-AI-Workspace
   
Utilisateur
Le Workspace n'a donc pas vocation à reproduire les mécanismes internes de PPS-Maroc.ia-V2. Il constitue l'environnement d'interaction avec ces mécanismes.
Gestion des conversations
L'architecture du Workspace comprend des mécanismes dédiés à la gestion de l'état et du déroulement des conversations.
Le développement a notamment porté sur :
- la centralisation de l'orchestration des conversations ;
- la sélection des conversations ;
- la gestion de l'interface associée ;
- la stabilisation du défilement et du layout ;
- la localisation de l'interface ;
- la préparation puis la validation de l'intégration avec PPS-Maroc.ia-V2.
Intégration avec PPS-Maroc.ia-V2
Une étape importante du développement a consisté à séparer clairement :
PPS-AI-Workspace
- interaction utilisateur et orchestration de l'interface
PPS-Maroc.ia-V2
- traitement documentaire, traitement des connaissances, contrôle d'exécution et intégration des modèles d'IA.
Cette séparation permet de faire évoluer indépendamment l'interface et le moteur expérimental.
Évolution de l'architecture
Le dépôt conserve l'historique des différentes étapes de développement et de refactorisation.
Parmi les travaux réalisés figurent notamment :
- architecture initiale du Workspace ;
- centralisation de l'orchestration des conversations ;
- gestion de la sélection des conversations ;
- amélioration de l'interface et du comportement responsive ;
- localisation ;
- intégration avec PPS-Maroc.ia-V2 ;
- expérimentation puis simplification du mécanisme d'affichage progressif des réponses.
Les mécanismes expérimentaux qui ne sont plus nécessaires peuvent être retirés lorsque les essais montrent qu'une architecture plus simple est préférable.
Technologies
- React
- TypeScript
- Vite
- architecture modulaire
- intégration avec PPS-Maroc.ia-V2
- Git pour la traçabilité du développement
Statut
PPS-AI-Workspace est un projet expérimental en développement actif.
Il fait partie de l'environnement logiciel PPS consacré à l'expérimentation d'architectures d'intelligence artificielle, de traitement documentaire et d'interaction humain-IA.
Auteur
Abdelkader Azzouzi
Chercheur indépendant en intelligence artificielle -Maroc

