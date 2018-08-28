# Project 2 TODO:

## Title
Brewly

## Define user stories
    * As a user, I want a home page so I know where I am.
    * As a user, I want to search for a beer recipe so I can find new recipes to make myself.
    * As a user, I want to save a recipe that I like so that I can find it easily later.
    * As a user, I want to add my own recipe to save that I found from a different source.
    * As a user, I want to see the recipe for my current batch of beer and leave notes about the process.
    * As a user, I want to see a history of my past batches.

## Data model
    * https://api.punkapi.com/v2/beers

### Response:
```
res: {
        "id": 1,
        "name": "Buzz",
        "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
        <!-- "image_url": "https://images.punkapi.com/v2/keg.png", -->
        "abv": 4.5,
        "ibu": 60,
        "target_fg": 1010,
        "target_og": 1044,
        "ebc": 20, // This is the color of the beer
        "srm": 10, // Also color
        <!-- "ph": 4.4, -->
        "volume": { // After boil vol.  Will need to convert to american
            "value": 20,
            "unit": "liters"
        },
        "boil_volume": {
            "value": 25,
            "unit": "liters"
        },
        "method": {
            "mash_temp": [
                {
                    "temp": {
                        "value": 64,
                        "unit": "celsius"
                    },
                    "duration": 75
                }
            ],
            "fermentation": {
                "temp": {
                    "value": 19,
                    "unit": "celsius"
                }
            },
            "twist": null
        },
        "ingredients": {
            "malt": [
                {
                    "name": "Maris Otter Extra Pale",
                    "amount": {
                        "value": 3.3,
                        "unit": "kilograms"
                    }
                },
                {
                    "name": "Caramalt",
                    "amount": {
                        "value": 0.2,
                        "unit": "kilograms"
                    }
                },
                {
                    "name": "Munich",
                    "amount": {
                        "value": 0.4,
                        "unit": "kilograms"
                    }
                }
            ],
            "hops": [
                {
                    "name": "Fuggles",
                    "amount": {
                        "value": 25,
                        "unit": "grams"
                    },
                    "add": "start",
                    "attribute": "bitter"
                },
                {
                    "name": "First Gold",
                    "amount": {
                        "value": 25,
                        "unit": "grams"
                    },
                    "add": "start",
                    "attribute": "bitter"
                },
                {
                    "name": "Fuggles",
                    "amount": {
                        "value": 37.5,
                        "unit": "grams"
                    },
                    "add": "middle",
                    "attribute": "flavour"
                },
                {
                    "name": "First Gold",
                    "amount": {
                        "value": 37.5,
                        "unit": "grams"
                    },
                    "add": "middle",
                    "attribute": "flavour"
                },
                {
                    "name": "Cascade",
                    "amount": {
                        "value": 37.5,
                        "unit": "grams"
                    },
                    "add": "end",
                    "attribute": "flavour"
                }
            ],
            "yeast": "Wyeast 1056 - American Ale™"
        },
        "food_pairing": [ //stretch goal
            "Spicy chicken tikka masala",
            "Grilled chicken quesadilla",
            "Caramel toffee cake"
        ],
        "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
        "contributed_by": "Sam Mason <samjbmason>"
    },
```

### Search filters available
    * ABV greater than the supplied number
    * ABV less than the supplied number
    * IBU greater than the supplied number
    * IBU less than the supplied number
    * EBC greater than the supplied number
    * EBC less than the supplied number

### Available Search params
    * Beer Name: Returns all beers matching the supplied name
    * Yeast: Returns all beers matching the supplied yeast name
    * Brewed Before: Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
    * Brewed After:	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
    * Hops:	Returns all beers matching the supplied hops name
    * Malt: Returns all beers matching the supplied malt name
    * Food: Returns all beers matching the supplied food string
    * Ids: Returns all beers matching the supplied ID's.

## Define routes
| METHOD | PATH | PURPOSE |
| ------- | -------------------------- | -----------------------------------|
| GET | / | Home page |
| GET | /login | Login form |
| POST | /login | Receive and authenticate user |
| GET | /signup | New user signup form |
| POST | /signup | Receive form and add new user to db |
| GET | /recipes/ | Users recipe box |
| GET | /recipes/find | Recipe finder |
| GET | /recipes/new | New recipe form |
| POST | /recipes/new | Receive new recipe and add to db |
| GET | /recipes/:id | Show requested recipe |
| POST | /recipes/:id | Make new batch of recipe |
| PUT | /recipes/:id | Edit recipe |
| DELETE | /recipes/:id | Remove recipe from recipe box|
| GET | /recipes/batch/:id | Show requested batch notes |
| PUT | /recipes/batch/:id | Edit past batch notes |
| DELETE | /recipes/batch/:id | Delete past batch |

## Define table models
    * User: {
        id: integer (serial primary key),
        first_name: string (notNull),
        last_name: string (notNull),
        email: string (validate),
        password: string (validate),
        createdAt: date,
        updatedAt: date
    }

    * Recipe: {
        id: integer (serial primary key),
        name: string (notNull),
        abv: integer,
        ibu: integer,
        target_og: integer,
        target_fg: integer,
        ebc: integer,
        srm: integer,
        batch_size: integer,
        mash_temp: integer,
        fermentation_temp: integer,
        ingredients: text (stringified JSON of all ingredients)
        brewing_notes: text,
        hop_notes: text,
        yeast_notes: text,
        fermentation_notes: text,
        hydrometer_readings: string,
        kegging_notes: text,
        tasting_notes: text,
        punk_id: integer,
        batch_number: integer,
        createdAt: date,
        updatedAt: date
    }

### Build/Sketch Entity-Relationship Model
    * Entity-Relationship Model at: https://www.lucidchart.com

## Phases of recipies/cards/tracking
#### Brew Day!
    * Rename 'twist' to adjuncts, add brewing notes.
    * Basic meta data
    * Ingredients
    * Brewing Notes
    * Hop Notes - Differentiate between 'flavoring' and 'bittering' (time that you add it in the process)
    * Yeast Notes

#### Fermentation Time
    * Add fermentation notes
        - (multiple)hydrometer readings (date and sg) => output abv

#### Bottling/Tasting time
    * Kegging / Bottling notes, 
    * Tasting notes

## Wireframe design 
    * Wireframed at: https://mockflow.com

## Font selection
    * Headers / Buttons - https://fonts.google.com/specimen/Merriweather/
    * Body - https://fonts.google.com/specimen/Open+Sans/

## Image and colors

## Responsiveness: Bootstrap / Materialize

<!-- TODO: Find all-grain -> extract conversion -->