# Brewly

Brewly is a recipe finder and recipe box for homebrewers.  It utilizes the Punk API from BrewDog Brewing to find recipes.  

## User stories
    * As a user, I want a home page so I know where I am.
    * As a user, I want to search for a beer recipe so I can find new recipes to make myself.
    * As a user, I want to save a recipe that I like so that I can find it easily later.
    * As a user, I want to add my own recipe to save that I found from a different source.
    * As a user, I want to make edits to the recipes in my recipe list.
    * As a user, I want to delete recipes from my recipe list
    
## Routes
| METHOD | PATH | PURPOSE |
| ------- | -------------------------- | -----------------------------------|
| GET | / | Home page |
| GET | /auth/login | Login form |
| POST | /auth/login | Receive and authenticate user |
| GET | /auth/signup | New user signup form |
| POST | /auth/signup | Receive form and add new user to db |
| GET | /profile/recipes/ | Users recipe box |
| GET | /profile/find | Recipe finder |
| POST | /profile/find | Search for a recipe |
| POST | /profile/add | Add a searched recipe to the recipe box |
| GET | /profile/new | New recipe form |
| POST | /profile/new | Receive new recipe and add to db |
| GET | /profile/recipes/:id | Show requested recipe |
| PUT | /profile/recipes/:id | Edit recipe |
| DELETE | /profile/recipes/:id | Remove recipe from recipe box|

## Define table models
```
    * User: {
        id: integer (serial primary key),
        first_name: string (notNull),
        last_name: string (notNull),
        email: string (validate),
        password: string (validate),
        createdAt: date,
        updatedAt: date
    }
```

```
    * Recipe: {
        id: integer (serial primary key),
        name: string (notNull),
        style: string,
        batchSize: string
        abv: float,
        ibu: integer,
        target_og: integer,
        target_fg: integer,
        ebc: integer,
        srm: integer,
        batch_size: integer,
        mashTemp: integer,
        fermTemp: integer,
        ingredients: text,
        punk_id: integer,
        userId: integer,
        createdAt: date,
        updatedAt: date
    }
```

## Wireframe design 
    * Wireframed images: https://drive.google.com/drive/folders/1tyPtbFKk__RFhmzoJyq_eC6d7QI1J0uJ?usp=sharing
