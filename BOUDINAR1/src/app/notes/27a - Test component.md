## Créer un composant

Notre projet premier pas possède maintenant deux composants un alpha et l'autre beta. Explorons avec eux comment ajouter ces composants dans les tests.

Il y a un fichier de test créé par le `ng generate component` ainsi il est possible que le composant soit déjà testé. Roulons la commande `ng test` pour vérifier l'état de nos tests.

---

Ici il semble que l'utilisation des composants crée une erreur, car les composants ajoutés requis pour l'affichage ne sont pas vus

Dans le `app.component.spec.ts` il y a dans l'appel de `configureTestingModule` une déclaration des composants et modules à importer pour les tests. Ici il est possible d'ajouter les composants manquant pour permettre l'exécution des tests.

```typescript
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      AlphaComponent,
      BetaComponent
    ],
    imports: [
      FormsModule,
      BetaSAComponent
    ],
  }));
```

De même puisque le composant Alpha requiert d'autres composants il faut aussi les ajouter

```typescript
    TestBed.configureTestingModule({
      declarations: [
        AlphaComponent,
        BetaComponent
      ],
      imports: [
        BetaSAComponent
      ]
    });
    fixture = TestBed.createComponent(AlphaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
```

> [!important] Ici, on observe que tous éléments requis par un composant doivent être inclus aussi par les tests. De plus un composant possède ses propres tests et doit aussi inclure ses dépendances pour permettre l'exécution des tests.

> [!warning] ici on peut voir que dès l'ajout de composant simple les tests sont brisés et il est donc requis de toujours les conserver fonctionnels pour simplifier leur maintient.

  
Chaque test représente une application, car `const fixture = TestBed.createComponent(AppComponent);` crée un composant qui avec nos nouvelles modifications maintenant incluses d'autres composants avec éventuellement toutes les dépendances.
  
Ici dans notre scénario actuel, il est plus simple d'ajouter simplement les composants dans leurs définitions. Plus tard avec les services, ça sera plus problématique.

> [!warning] Ici un composant qui utilise un autre composant doit l'inclure. Cependant il est possible aussi de créer des coquilles permettant d'inclure une mascarade qui simulera le composant ou le service. Nous toucherons à ce concept plus tard dans la session.

> [!danger] Si a ce point vos tests ne fonctionnent pas demandez de l'aide juste pour s'assurer que tous est corrects avec votre environnement.

