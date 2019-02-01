const forest = {
    configuration: null,
    start: function (config) {
        //debug mode pour afficher ou pas les console.log :
        if (config.debug_mode == false) {
            console.log = function () {}
        }
        this.configuration = config;
        this.gfx_engine.init(config.gfx_engine);
        
        this.game.init(config.game);

        this.update();

        console.log('forest is started !');
    },

    update: function(){
        requestAnimFrame(forest.update)
        forest.game.update();
        forest.gfx_engine.update();
        
    }
};