# Technical features and documentation

Currently the whole project is in a complete experimental mode (aka hacky code :smirk:). Lots of it is more of a P.o.C. implementation and will be cleaned up part by part while we go along.




## external resources

This project is dependent on lots of external resources listed below.


One of them **MUST** be installed via mrt before: `mrt add clockpicker`



### iron router

official guide:
https://github.com/iron-meteor/iron-router/blob/devel/Guide.md

short reference:
http://www.manuel-schoebel.com/blog/iron-router-tutorial


### d3

Brush example: http://bl.ocks.org/mbostock/1667367


### intent

We're using an android `intent` to share our csv text data.

https://github.com/Initsogar/cordova-webintent


```
meteor add cordova:com.borismus.webintent.WebIntent
meteor add cordova:com.virtualartifacts.webintent@1.0.0
meteor add cordova:net.tunts.webintent@0.2.1
```

https://github.com/Initsogar/cordova-webintent/issues/42
https://build.phonegap.com/plugins/363
or
https://build.phonegap.com/plugins/989



`meteor add cordova:com.borismus.webintent@https://github.com/Initsogar/cordova-webintent/tarball/3d12378de9f38be900761a0ad06ab697cf6d9add`



### bootstrap material

The layout is build with bootstrap3 with a nice material design from fezvrasta.

http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html


To change the less files within meteor:
https://github.com/FezVrasta/bootstrap-material-design/issues/332



### more external resources

* jQuery Clock picker (anroid style): http://www.jqueryrain.com/?B83aD_dg
  wrapped: https://github.com/AndrasPH/meteor-clockpicker

* datepicker https://github.com/rajit/bootstrap3-datepicker/

* noUiSlider: http://refreshless.com/nouislider/

* momentjs http://momentjs.com/docs/

* android icon generator http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html



## future!?

* CSV parser http://papaparse.com/
* cordova file in/output http://plugins.cordova.io/#/package/com.contraterrene.gapfile



## licenses

* Logo image "blood drop": http://pixabay.com/de/blut-spende-tropfen-tr%C3%B6pfchen-rot-156063/ (cc0 public domain)
