# Création d'un compte Google Cloud

- Gratuit pour le type d'utilisation que nous ferons
- Compte sera aussi partager avec Firebase
- AMI et concept de sécurité dans ce type d'infrastructure

Ceci devrait avoir été fait dans la section : [24a - cloud](cours/24a%20-%20cloud.md)

# Création d'une instance de base de données
- BigQuery vers une base de données ACID
- Type d'insertion vs opération sur les éléments
- Interface pour valider les requêtes ou modifier des informations

Ceci sera vu dans la section : [24e - Big Query](24e%20-%20Big%20Query.md)

# Création d'une fonction

- Fonctions fournies comme référence
- Sécurité des données vs cette implémentation

# Déploiement d'un service



Création d'un projet

> [!warning] Il est possible si vous avez fait la création d'un projet lors d'exploration précédente. Si c'est le cas juste utiliser le projet que vous avez créez.


![](images/Pasted%20image%2020231019152954.png)

Retrouver un projet dans l'interface

![](images/Pasted%20image%2020231019153157.png)

## Services

Il existe beaucoup de service et ici nous n'utiliserons qu'une fraction des services disponibles. Pour atteindre un des services, la navigation se fait par le panneau gauche. Certain service apparaitrons d'emblée. D'autres peuvent être atteints en utilisant l'option "autre produit".

Retrouver ces services dans la liste

- Compute Engine
- BigQuery
- CloudStorage
- Cloud Function


## Fonction de déploiement

Le code fournit par l'enseignant qui permet de créer des fonctions en utilisant le CLI de GCP. Vous devrez ici le configurer pour permettre de transmettre le code vers votre compte GCP.

>[!important] Pour utiliser les fonctionnalités décrites plus bas vous devez faire l'installation de Google CLI.  

## Installation CLI

Suivez les étapes d'installation décrites dans : https://cloud.google.com/sdk/docs/install?hl=fr

### Configuration pour gcloud

Pour configurer votre ordinateur pour `gcloud` vous pouvez utiliser la commande, `gcloud init` ceci configurera la ligne de commande pour permettre l'accès à votre compte GCP. Ceci créa un processus similaire à Firebase Init

> [!warning] Assurez-vous et toujours utiliser le même projet pour tous les opérations que vous effectuerez pour le cours. Par exemple la base de données et les fonctions doivent être dans le même projet pour éviter d'avoir à mettre en place des règles pour les échanges de données entre projets.


```shell
$ gcloud init
Welcome! This command will take you through the configuration of gcloud.

Your current configuration has been set to: [default]

You can skip diagnostics next time by using the following flag:
  gcloud init --skip-diagnostics

Network diagnostic detects and fixes local network connection issues.
Checking network connection...done.
Reachability Check passed.
Network diagnostic passed (1/1 checks passed).

You must log in to continue. Would you like to log in (Y/n)?  Y

Your browser has been opened to visit:

    https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=32555940559.apps.googleusercontent.com&redirect_uri=ht***STRIPPED_BY_DIDIER***llenge=xmchIyXt4NgMmsC_MbY7zFVlgsL60USVoxzUicjNrtY&code_challenge_method=S256

tcgetpgrp failed: Not a tty

Updates are available for some Google Cloud CLI components.  To install them,
please run:
  $ gcloud components update

You are logged in as: [didier.tremblay@claurendeau.qc.ca].

Pick cloud project to use:
 [1] ce******l
 [2] de********ee
 [3] gr2********ees
 [4] gr********emo
 [5] re**********15
 [6] resultat222
 [7] te********gner
 [8] we*****519
 [9] web345-a23
 [10] Enter a project ID
 [11] Create a new project
Please enter numeric choice or text value (must exactly match list item):  9

Your current project has been set to: [web345-a23].

Do you want to configure a default Compute Region and Zone? (Y/n)?  y

Which Google Compute Engine zone would you like to use as project default?
If you do not specify a zone via a command line flag while working with Compute Engine resources, the default is assumed.
 [1] us-east1-b
 [2] us-east1-c
 [3] us-east1-d
 [4] us-east4-c
 [5] us-east4-b
 [6] us-east4-a
 STRIPPED_LINES
 STRIPPED_LINES
 STRIPPED_LINES
 [112] us-west2-c
 [113] us-west3-a
 [114] us-west3-b
 [115] us-west3-c
 [116] us-west4-a
 [117] us-west4-b
 [118] us-west4-c
Did not print [69] options.
Too many options [119]. Enter "list" at prompt to print choices fully.
Please enter numeric choice or text value (must exactly match list item):  95

Your project default Compute Engine zone has been set to [northamerica-northeast1-a].
You can change it by running [gcloud config set compute/zone NAME].

Your project default Compute Engine region has been set to [northamerica-northeast1].
You can change it by running [gcloud config set compute/region NAME].

Created a default .boto configuration file at [/home/dtremblay/.boto]. See this file and
[https://cloud.google.com/storage/docs/gsutil/commands/config] for more
information about configuring Google Cloud Storage.
Your Google Cloud SDK is configured and ready to use!

* Commands that require authentication will use didier.tremblay@claurendeau.qc.ca by default
* Commands will reference project `web345-a23` by default
* Compute Engine commands will use region `northamerica-northeast1` by default
* Compute Engine commands will use zone `northamerica-northeast1-a` by default

Run `gcloud help config` to learn how to change individual settings

This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
Run `gcloud topic configurations` to learn more.

Some things to try next:

* Run `gcloud --help` to see the Cloud Platform services you can interact with. And run `gcloud help COMMAND` to get help on any gcloud command.
* Run `gcloud topic --help` to learn about advanced features of the SDK like arg files and output formatting
* Run `gcloud cheat-sheet` to see a roster of go-to `gcloud` commands.
```

Lorsque c'est terminer, il est possible de déployer à l'aide de la command `npm run deploy` dans un des répertoires de fonctions fournis par votre enseignant.

> [!warning] Pour la première fois, il est possible que certains API de votre compte GCP ne soient pas activés. La commande de déploiement vous demandera la permission pour les activer.

Allez dans le répertoire : `serveur/error` et faire la commande `npm run deploy`

```shell
npm run deploy

> error@0.0.1 deploy
> cp -r ../basetemplate/src/common src/ && gcloud functions deploy error --entry-point myapiservice --allow-unauthenticated --trigger-http --runtime nodejs20

API [cloudfunctions.googleapis.com] not enabled on project [web345-a23]. Would you like to enable and retry (this will take a few minutes)? (y/N)?  y

Enabling service [cloudfunctions.googleapis.com] on project [web345-a23]...
Operation "operations/acf.p2-845265367537-33c21b29-bf75-49ba-8033-0269def56e6c" finished successfully.
Created .gcloudignore file. See `gcloud topic gcloudignore` for details.
API [cloudbuild.googleapis.com] not enabled on project [web345-a23]. Would you like to enable and retry (this will take a few minutes)? (y/N)?  y

Enabling service [cloudbuild.googleapis.com] on project [web345-a23]...
Operation "operations/acf.p2-845265367537-ebed8e02-3774-4d98-9724-6a459de6a8e1" finished successfully.
Deploying function (may take a while - up to 2 minutes)...⠼
For Cloud Build Logs, visit: https://console.cloud.google.com/cloud-build/builds;region=us-central1/cf360f44-94ab-48e2-8df0-1f81f863fb1b?project=845265367537
Deploying function (may take a while - up to 2 minutes)...done.
API [cloudfunctions.googleapis.com] not enabled on project [web345-a23]. Would you like to enable and retry (this will take a few minutes)? (y/N)?  y

Enabling service [cloudfunctions.googleapis.com] on project [web345-a23]...
availableMemoryMb: 256
buildId: cf360f44-94ab-48e2-8df0-1f81f863fb1b
buildName: projects/845265367537/locations/us-central1/builds/cf360f44-94ab-48e2-8df0-1f81f863fb1b
dockerRegistry: CONTAINER_REGISTRY
entryPoint: myapiservice
httpsTrigger:
  securityLevel: SECURE_ALWAYS
  url: https://us-central1-web345-a23.cloudfunctions.net/error
ingressSettings: ALLOW_ALL
labels:
  deployment-tool: cli-gcloud
name: projects/web345-a23/locations/us-central1/functions/error
runtime: nodejs20
serviceAccountEmail: web345-a23@appspot.gserviceaccount.com
sourceUploadUrl: https://storage.googleapis.com/uploads-15494708103.us-central1.cloudfunctions.appspot.com/b60fa43f-9ab5-4d09-9d54-dcf7296b2497.zip
status: ACTIVE
timeout: 60s
updateTime: '2023-11-16T15:49:23.109Z'
versionId: '1'
```

Lorsque terminer le lien pour votre API sera indiqué dans la section `httpsTrigger`.  Il sera aussi possible de voir votre fonction nouvellement déployée dans l'interface web.

![](images/Pasted%20image%2020231116105222.png)

Cette fonction permet de retourner une erreur pour chaque invocation et permet ainsi de tester du code pour la réception d'erreur. Ici cette fonction n'utilise aucun élément de base de données et permet ainsi de tester un déploiement.

[24e - Big Query](24e%20-%20Big%20Query.md)