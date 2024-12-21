Essayez à nouveau l'envoie de message si tous va bien vous devriez avoir un `{success: true}`

Et assurez vous de voir votre contenu apparaitre dans la base de données

![](images/Pasted%20image%2020231124094509.png)

# Déploiement 

Maintenant que le code fonctionne localement, déployez le dans votre environnement GCP. À partir de votre répertoire `serverless/messages` faites la commande `npm run deploy`

Ceci déploiera votre service dans votre cloud GCP. L'adresse pour votre service sera affiché dans la console.

![](images/Pasted%20image%2020231126073132.png)

Changez l'adresse `http://localhost:8080` de votre service pour l'adresse de la de votre cloud fonction. Celle-ci devrait apparaitre dans la console ou vous avez fait votre `npm run deploy`.

Sinon dans votre interface pour votre fonction

![](images/Pasted%20image%2020241119092641.png)

# Récupération des message

Ok maintenant complétez l'application en implémentant la méthode GET. Il y a une méthode `queryDB` qui permet de faire une requête sur une table de la base de données. Voici un exemple

```typescript
         const data = await this.myDB.queryDB(
            {
                table: 'messages',
                fields: `id, message`
            }
        );
```

