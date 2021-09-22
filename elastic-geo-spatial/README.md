# Create Index and Load Data for Geo Spatial Data Types (POINT and SHAPE)
Start elastic search and kibana for query console.

``` shell
$ docker-compose up -d
```
1. Install node modules 
``` shell
$ npm install
```
2. Load Data for Geo Point (geo_cities_point)
``` shell
$ node cities.js
```
3. Load Data for Geo Shapes (geo_cities_shapes)
``` shell
$ node countys.js
```
#### Note : It creates index and load data from json file. If you want to re run please delete index and re run again. It applies for both POINT and SHAPES too.
