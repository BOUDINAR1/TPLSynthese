> [!exercice] Ici nous allons créer une fonction et l'utiliser dans une application pour écrire des messages qui seront persister dans la base de données BigQuery. Cette exercice permet de revoir les étapes pour la création d'un service à l'aide de fonctions et BigQuery.


> [!important] si vous modifier des éléments se trouvant de la répertoire commun, vous devez les modifier dans le répertoire `basetemplate` 

# Création de l'application

Créez une application Angular `demo-message` 

Ajoutez un service `messages` 

Créer deux composants `envoie` et `affiche`

Dans votre route, mettre: 

```typescript
  { path: 'envoie', component: EnvoieComponent },
  { path: 'affiche', component: AfficheComponent }
```

Dans votre `app.component`

```html
<div class="container">
  <div class="row">
    <div class="col-2">
      <a class="btn btn-large btn-info m-2" routerLink="/envoie">Envoie messages</a>
      <a class="btn btn-large btn-info m-2" routerLink="/affiche">Voir messages</a>
    </div>
    <div class="col-10">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

Dans le composant `envoie`

```html
<div>
    <input type="text" class="form-control m-4 " [(ngModel)]="message">
</div>
<div>
    <button class="btn btn-large btn-success m-4" (click)="addMessage()">Ajouter message</button>
</div>
```

```typescript
  message="";
 
  addMessage() {
    console.log(this.message);
  }
```

Ajouter `provideHttpClient()` dans votre `app.config.ts`

Dans votre service, créez une fonction pour transmettre un message

```typescript

  // Temporaire pour faire les test locals
  serveur = "http://localhost:8080";
  
  constructor(
    private http: HttpClient
  ) { }

  transmettreMessage(message: string) {
    console.log(message);
    const url = this.serveur + "/messages";
    const body = { message: message };
    return this.http.post(url, body);
  }
```

Dans votre composant, `envoie` utilisez le service pour transmettre l'information

```typescript
  constructor(
    private messagesService: MessagesService
  ) { }
  
  addMessage() {
    console.log(this.message);
    this.messagesService.transmettreMessage(this.message)
      .subscribe(
        {
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }
```

> [!ajout] Capturer les réponses du serveur pour le succès et les erreurs et les afficher dans le composant pour donner une rétroaction à votre utilisateur.

Essayez l'envoie de message vous devriez avoir une erreur tel que `envoie.component.ts:20 POST http://localhost:8080/messages net::ERR_CONNECTION_REFUSED`

# Création de la fonction

Dans le répertoire `serveur` des notes de cours (ou dans votre répertoire `serveur` du TP3) créez une fonction `messages` en utilisant le script `createservice.sh` 

> [!warning] Ici, ce service n'est pas lié au TP3 c'est pour une démonstration uniquement. 

```shell
$ ./createservice.sh messages
Auditing common folder
Creating service messages
```

Exécuté pour le moment le service localement pour voir si tout fonctionne correctement

Aller dans le répertoire de votre fonction `messages` faite `npm install` suivit de `npm run start`

Ici il est possible d'aller avec votre navigateur à l'adresse : http://localhost:8080/

Vous devriez voir une réponse `{ "msg": "ok" }`

Essayez encore votre fonction. 

> [!question] Est-ce que ça fonctionne? Quel est le problème???

À ce point vous devriez voir une erreur de type : `POST http://localhost:8080/messages 405 (Method Not Allowed)`

Ici le service répond, mais par défaut il supporte qu'un GET 

# Création de la base de données

Allez dans BigQuery et créez-vous une nouvelle table `messages` qui contient deux champs:
![](images/Pasted%20image%2020231124090534.png)

# Fonction ajout message

Dans votre service, ajoutez la fonction pour transmettre le message à la base de données.

En premier aller dans l'interface pour voir les paramètres de votre table et ajuster les paramètre du fichier `constantes.ts` pour votre base de données

![](images/Pasted%20image%2020241118132729.png)

Ajuster les variables dans le fichier `basetemplate/src/common/contantes.ts` pour votre environnement.

>[!danger] Ici vous devez modifier `basetemplate` le fichier constant est recopié par la fonction `build` et `deploy` à partir de `basetemplate` donc si vous modifiez le fichier `constantes` dans votre répertoire de votre fonction (par exemple `messages`) les informations seront perdu après un nouveau build ou déploiement

Dans le fichier `message/src/index.ts` 

Changer l'instance de MyAPI pour mettre la méthode POST et GET

```
    const myService = new MyAPI(req, res, "POST,GET");
```


Et changer l'implémentation de la classe MyAPI pour gérer les deux méthodes

```typescript
    
    async execute_post() {
        // TODO faire une validation des info reçu
        let message = this.req.body.message;
        // Juste pour faire la démo
        console.log("Received message: " + message);
  
        /*
        Ici je vais utiliser insertDBNoBuffer car le insert DB procède différemment et la requête est mise en attente
        await this.myDB.insertDB('messages', [
           {
               'message': message,
               'id': new Date().getTime()
           }
       ])
       */
  
        await this.myDB.insertDBNoBuffer(
            'messages',
            [
                // Attention à l'ordre des colonnes elle doit être identique à la table
                message,
                new Date()
            ]
        );
  
        this.send_success(this.res, { "success": true });
    }
 
    async execute_get() {
        // TODO A Implémenter
        let info_recu = [{}];
        this.send_success(this.res, info_recu);
    }
```

Redémarrez la fonction en test local avec  `npm run start`

Ici vous aurez une erreur car le code local n'est pas en mesure d'accéder la base de données qui se trouve dans le Cloud. Pour accéder à la base de données nous devons créer une clef d'accès.

Ajoutons un peu de code pour voir l'erreur dans notre interface au lieu d'avoir à regarder la console.


```typescript
  error!: HttpErrorResponse;
  ///
  error: (error) => {
            console.log(error);
            this.error = error;
          }
```

```html
@if (error) {
    <div class="alert alert-danger m-4">
        {{error.error.msg}}
    </div>
}
```


[24g - Clef d'access](24g%20-%20Clef%20d'access.md)