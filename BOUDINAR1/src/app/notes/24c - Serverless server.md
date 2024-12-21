  
# Serverless Server

![](images/Pasted%20image%2020231116142632.png)

## Introduction
  
Un serveur sans serveur!? Semble étrange, mais deviens possible avec l'infonuagique. Au lieu d'installer une application qui fonctionne en permanence, on écrit du code qui sera exécuté à la demande suivant un déclencheur.
  
Le fournisseur maintient les infrastructures requises pour supporter les fonctions à exécuter
  
* Concepts
* Fonctionnement
* Éphémère
* Google Cloud -> Cloud Function [Documentation](https://cloud.google.com/functions)
* AWS -> Lambdas [Documentation](https://aws.amazon.com/lambda/)
* Azure -> Functions [Documentation](https://azure.microsoft.com/en-us/services/functions/#overview)

# Code pour Cloud Function
Pour cette partie un code de base est fourni par l'enseignant pour faciliter la mise en place de fonction infonuagique.

Voici un aperçut du code fourni

> [!warning] Ce code peut être trouvé dans le répertoire des notes de cours dans le répertoire serveur ainsi que dans votre projet TP3 dans le répertoire serveur.
> 

![](images/Pasted%20image%2020241118095931.png)
## Code de base

- `basetemplate`
  - Contiens le code de référence pour vos fonctions, il est probable que vous n'aurez pas a modifier ce code. Chaque service que vous allez créer sera créé à partir du code dans ce répertoire.
- createservice.sh
  - Script permettant de créer un nouveau service. Il est aussi possible d'exécuter ce script sans spécifier de nom de service ce qui affichera une validation des répertoires communs.
- deployall.sh
  - Script qui traitera tous les services contenus dans ce répertoire pour les déployer dans votre environnement.

> [!warning] Chaque fonction partage un code commun pour les constantes, le serveur de base et l'accès à la base de données. Si vous devez modifier le contenu du répertoire commun, vous devriez redéployer tous vos services pour vous assurer que le changement est propagé dans tous vos services.

>[!danger] Ce code est livré pour des fins pédagogique et peut contenir des éléments non sécure. Il n'est pas recommandé d'utiliser ce code dans un produit mis en production.

## Fonction NPM

Pour déployer ou exécuter votre code vous avez les fonctions suivante.

`npm run deploy`
- Permets de déployer un service dans votre compte GCP

> [!important] Ce déploiement utiliser le CLI de GCP vous devez donc préalablement configurer votre environnement avant d'être en mesure de faire le déploiement avec cette fonction. Ceci sera vue à la section [24d - Implementation de fonctions sans serveur](24d%20-%20Implementation%20de%20fonctions%20sans%20serveur.md) 


`npm run start`
- Exécute localement votre service

> [!warning] Les services utilisant BigQuery requièrent que votre environnement ait une variable "GOOGLE_APPLICATION_CREDENTIALS" pointant vers un fichier `.json` valide ayant les paramètres d'accès de votre compte GCP nous aborderons ceci dans [24e - Big Query](24e%20-%20Big%20Query.md)

>[!danger] Pour utiliser `npm run start` vous devez préalablement faire l'installation des paquets avec `npm install` ou `pnpm install`

![](images/Pasted%20image%2020231108104513.png)
[24d - Implementation de fonctions sans serveur](24d%20-%20Implementation%20de%20fonctions%20sans%20serveur.md)