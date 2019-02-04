forest.gfx_engine = {
    init: function (config) {
        // --- scene
        this.scene = new THREE.Scene();

        //Fog :
        this.scene.background = new THREE.Color(0xefd1b5);
        this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

        config = config || {}; //pour le fov
        const fov = config.camera_fov || 75; //si config.camera_fov est undefined !

        // --- camera
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, 5000);

        this.scene.add(this.camera);

        const perf = forest.configuration.high_performance || true;

        //light pour le sapin :
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 0, 10);
        this.scene.add(light);

        // model
        const loader = new THREE.FBXLoader();
        loader.load('./obj/source/Fur_troe_mesh.fbx', function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            object.position.set(0, -0.2, -2);
            object.scale.set(0.001, 0.001, 0.001);
            forest.gfx_engine.scene.add(object);
            console.log("object added !");
            
        });

        // --- renderer :
        this.renderer = new THREE.WebGLRenderer({ antialias: perf }); //option qui prend des ressources
        this.renderer.setPixelRatio(window.devicePixelRatio); //standard du pixel (carré etc ...)
        this.renderer.setSize(window.innerWidth, window.innerHeight); //full-screen
        document.body.appendChild(this.renderer.domElement);

        if (perf) {
            this.renderer.antialias = true;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.BasicShadowMap;
            console.log("high_performance = true");
        } else {
            this.renderer.antialias = false;
            this.renderer.shadowMap.enabled = false;
            console.log("high_performance = false");
        }

        if (forest.configuration.debug_mode) {
            //fonction IIFE pour voir les stats :
            (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();
            console.log("debug_mode = true");
        } else {
            console.log("debug_mode = false");
        }

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();



        console.log("gfx_engine ready !");
    },

    update() {
        this.renderer.render(this.scene, this.camera)
    }



};