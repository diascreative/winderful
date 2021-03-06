# DIAS_ Winderful ![wind](http://winderful.diascreative.net/static/img/screenshot.png)

Out little project to show the current and past wind power generated in the UK in a graphical manner.
[View project](http://winderful.diascreative.net).

## Installation instructions
1. clone the repository into a folder called winderful

    `git clone https://github.com/diascreative/winderful.git`

2. enter the project folder

    `cd winderful`

3. create a new database

    `mysql > CREATE DATABASE power;`

4. set up the database structure

    `mysql power < /assets/power.db.schema.sql`

5. define the project settings

    * copy config.sample.php into config.php

      `cp inc/config.sample.php inc/config.php`
    * edit config.php so that it has the correct DB settings

## Initial setup
1. populate the DB with the latest data

    `php scripts/update-db.php`

    (you can also run this from the browser)

2. For  development purposes you will need to
    1. install npm

    2. install the project dependencies

        `npm install`
    3. run gulp

        `gulp`

        Keep this terminal open so that it automatically lints, concatenates and compresses our JS and SASS.

## TODO - help us out with a PR if you can
1. Change the update script to get data from BM reports directly instead of gridwatch


## Dev notes
All front-end changes should be made to the files in `/assets` **never** to those in `static`. Gulp will clean `static`regularly and any changes made there will be lost.
