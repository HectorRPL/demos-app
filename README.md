    BASE DE DATOS MONGO
        Acceder a una misma base de datos
            Colocar la siguiente linea en la consola.
            
            Linux:
            export MONGO_URL=mongodb://localhost:27017/demos-dev1
            
            Windows:
            SET MONGO_URL=mongodb://localhost:27017/demos-dev1
        
        Importar / Exportar Collections
            
            mongoexport --db demos-dev --collection tallas --out tallas.json
            
            mongoimport --host localhost --port 27017 --collection puestos --db demos-dev1 --file puestos.json
    
    SERVER
        Levantar las dos apps al mismo tiempo (Demos / Agency)
        
        Levantar cualquiera de las dos con normalidad pero al levantar la 
        segunda añadir --port 3001 de tal manera que quedaría así:
        
        COMANDO PARA LEVANTAR LOS PROYECTOS (AGENCIA Y DEMOS)
        meteor npm start
    
    /// PROYECTO DESDE DESDE CERO ///
    
        Todas las dependencias instaldas:
        (meteor-node-stubs@~0.2.0 y angular-meteor@^1.3.11 ya venían por defecto)
        
        Comandos ejecutados en la consola:
        
        git init
        git add .
        git commit -m "Initial commit"
        meteor remove blaze-html-templates
        meteor npm --save install angular@^1.5.8 (No lo puse en commit)
        meteor npm --save install babel-runtime
        meteor add angular-templates
        meteor add pbastowski:angular-babel
        meteor npm --save install angular-ui-router@^0.2.18
        meteor remove insecure
        meteor add accounts-password
        meteor add dotansimha:accounts-ui-angular
        meteor add accounts-facebook
        meteor remove autopublish
        meteor npm --save install angular-utils-pagination@^0.11.1
        meteor add tmeasday:publish-counts
        meteor npm --save install angular-simple-logger@^0.1.7
        meteor npm --save install bootstrap@^3.3.7
        meteor add less@2.7.5
        meteor npm --save install angular-animate@^1.5.8
        meteor add fortawesome:fontawesome
        meteor add mrt:moment
        meteor add service-configuration
        meteor add mdg:validated-method
        meteor add aldeed:simple-schema
        meteor add mdg:validation-error
        meteor add tunifight:loggedin-mixin
        meteor add tmeasday:publish-counts
        meteor add aldeed:collection2
        meteor add dburles:collection-helpers
        meteor add reywood:publish-composite
        meteor add ziarno:provide-mixin
        meteor add shell-server
        meteor add meteorhacks:aggregate
        meteor add didericis:callpromise-mixin
        meteor add u2622:persistent-session
        meteor npm --save install angular-messages@^1.5.8
        meteor npm --save install angular-ui-bootstrap@^1.3.3
        meteor npm --save install bcrypt@^0.8.7
        meteor npm --save install bootstrap-social@^5.0.0
        meteor npm --save install font-awesome@^4.7.0
        
                
        Líneas No ejecutadas:
        
        meteor remove angular-templates
        meteor add urigo:static-templates
        meteor add sanjo:jasmine
        meteor add velocity:html-reporter
        meteor add velocity:html-reporter
        meteor npm --save install -dev angular-mocks
        meteor add check
        meteor add email
        meteor npm --save install  angular-google-maps
        meteor npm install angular-aria angular-material --save
        meteor add jalik:ufs
        meteor add jalik:ufs-gridfs
        meteor npm install gm --save
        meteor npm install ng-file-upload --save
        meteor npm install ng-img-crop --save
        meteor npm install angular-sortable-view --save
        meteor add edgee:slingshot
        meteor add mys:typescript-ng-annotate
        meteor remove pbastowski:angular-babel
        typings install