
# Clef d'accès

Pour accéder la base de données que vous avez créée à partir de votre ordinateur, vous devez récupérer une clef permettant l'accès a votre base de données.

> [!important] Ici l'accès n'est pas récupéré par l'interface de BigQuery l'accès fait partie des rôles de GCP et  typiquement il est important de créer les accès en étant le plus restrictif possible. Ce que vous créez ici est accessible sur l'internet donc vous devez toujours prendre garde. Cependant pour conserver la théorie simple, ici nous allons créer une clef ayant plus d'accès qu'il ne devrait.

### IAM et Administration

Pour permettre l'accès, vous allez créer un compte de service permettant de créer un pseudo utilisateur ayant accès à des ressources. Ceci n'est pas un utilisateur réel, mais permettra de définir une clef d'accès qui aura les permissions que nous lui assignerons.

![](images/Pasted%20image%2020231115103548.png)

### Créer un utilisateur et continuer à la prochaine étape

![](images/Pasted%20image%2020231115104449.png)

### Choisi éditeur

![](images/Pasted%20image%2020231115104557.png)

### Et complété

Inutile d'ajouter des utilisateurs à la troisième option Mettre `Administrateur BigQuery`

![](images/Pasted%20image%2020231115104659.png)

### Génération de la clef

Dans l'écran suivant, trouvez l'utilisateur que vous avez créé et gérez les clefs de cet utilisateur
![](images/Pasted%20image%2020231115104833.png)

Ajoutez une clef

![](images/Pasted%20image%2020231115104906.png)

![](images/Pasted%20image%2020231115105006.png)

Ceci téléchargera un fichier JSON contenant la clef, placer cette dernière dans votre ordinateur. 

> [!danger] Ici il n'est pas une bonne pratique de mettre cette clef dans Git car elle donne accès a vos données vous devriez la conserver dans un endroit sure. Cependant ici puisque c'est pour un cours ce n’est pas si pire, mais en production faites attention!!!

Maintenant lorsque vous démarrez votre serveur vous devez configurer une variable d'environnement identifiant le fichier de clef que vous avez téléchargé

 `export GOOGLE_APPLICATION_CREDENTIALS="VOTREPATH/VOTREFICHIER-al-83dd4c6a1e4d.json"`

Maintenant que vous avez la clef, vous devez modifier le fichier `configuration.ts` ou `constantes.ts` pour l'ajuster à votre projet GCP


![](images/Pasted%20image%2020231115112059.png)

Lorsque vous avez tout fini, vous devriez avoir: 

![](images/Pasted%20image%2020231115112316.png)

> [!question] Est-ce que cette erreur est un bon signe ou mauvais. Que peut-on faire maintenant?


## GOOGLE_APPLICATION_CREDENTIALS

Il est possible de persister votre variable `GOOGLE_APPLICATION_CREDENTIALS` en ajoutant l'export dans votre fichier `~/.bashrc` vous n'avez qu'à ajouter la ligne dans ce fichier et la variable sera défini à chaque fois que vous ouvrirez un terminal GitBash

Vous pouvez vérifier votre variable avec `echo $GOOGLE_APPLICATION_CREDENTIALS` et utiliser `cat $GOOGLE_APPLICATION_CREDENTIALS` pour afficher le contenu et ainsi valider que la variable pointe vers un fichier valide.

# Essaie

Maintenant redémarrer votre service local et essayez de nouveau. Si tout va bien vous aller voir un log dans la console du navigateur. Aussi aller voir dans la base de données BigQuery pour y voir le contenu que vous avez ajouté.

Maintenant ajouter le code pour afficher un message de succès pour quelques secondes et vider le champ de texte lorsque le message fut transmit avec succès.

Aussi faite un test en cliquant plusieurs fois sur le bouton. Hums plusieurs messages sont transmit.... 

Protégez votre application pour éviter de transmettre plusieurs fois le même message donc lors de la transmission rendre le bouton inactif.

[24h - Deploiement fonction](24h%20-%20Deploiement%20fonction.md)

