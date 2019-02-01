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