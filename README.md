# ![image](http://upload.wikimedia.org/wikipedia/commons/9/91/Windmill.svg =60x) DIAS_ Wind Power

Out little project to show the current and past wind power generated in the UK in a graphical manner.

## Installation instructions
1. clone the repository

    `git clone git@github.com:diascreative/power.git`

* enter the project folder

    `cd power`

* create a new database

    `mysql > CREATE DATABASE power;`

* set up the database structure

    `mysql power < /assets/power.db.schema.sql`

* define the project settings

    * copy config.sample.php into config.php

      `cp inc/config.sample.php inc/sample.php`
    * edit sample.php so that it has the correct DB settings

## Initial setup
1. populate the DB with the latest data

    `php json/update-db.php`

    (you can also run this from the browser)

* For  development purposes you will need to
    1. install npm

    * install the project dependencies

        `npm install`
    * run gulp

        `gulp`

        Keep this terminal open so that it automatically lints, concatenates and compresses our JS and SASS.


## Dev notes
All front-end changes should be made to the files in `/assets` **never** to those in `static`. Gulp will clean `static`regularly and any changes made there will be lost.