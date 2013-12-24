(function() {
  var Tree;

  FW.Tree = Tree = (function() {
    var rnd;

    rnd = FW.rnd;

    function Tree(pos) {
      var position, y, _i, _ref;
      this.position = pos;
      this.treeTick = 5;
      this.ornamentGroups = [];
      this.ornamentTick = .08;
      this.numLayers = 100;
      this.treeGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/leaf2.png'),
        maxAge: 100,
        blending: THREE.NormalBlending
      });
      for (y = _i = 1, _ref = this.numLayers; 1 <= _ref ? _i <= _ref : _i >= _ref; y = 1 <= _ref ? ++_i : --_i) {
        position = new THREE.Vector3(rnd(this.position.x - 10, this.position.x + 10), y * 4, this.position.z);
        this.treeGroup.addEmitter(this.generateTree(y, position));
        this.createOrnamentGroup(y);
      }
      FW.scene.add(this.treeGroup.mesh);
    }

    Tree.prototype.generateTree = function(y) {
      var spread, treeEmitter;
      spread = Math.max(0, 250 - y * 2.5);
      return treeEmitter = new ShaderParticleEmitter({
        size: 150,
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread, 10, spread),
        colorEnd: new THREE.Color(),
        particlesPerSecond: 10 / y,
        opacityEnd: 1.0
      });
    };

    Tree.prototype.tick = function() {
      var ornamentGroup, _i, _len, _ref, _results;
      this.treeGroup.tick(this.treeTick);
      if (this.treeTick > 0.0) {
        this.treeTick -= .4;
      }
      _ref = this.ornamentGroups;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ornamentGroup = _ref[_i];
        _results.push(ornamentGroup.tick(this.ornamentTick));
      }
      return _results;
    };

    Tree.prototype.createOrnamentGroup = function(y, position) {
      var ornamentGroup;
      ornamentGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 20,
        blending: THREE.AdditiveBlending
      });
      ornamentGroup.addEmitter(this.generateOrnaments(y));
      this.ornamentGroups.push(ornamentGroup);
      FW.scene.add(ornamentGroup.mesh);
      return ornamentGroup.mesh.renderDepth = -1;
    };

    Tree.prototype.generateOrnaments = function(y) {
      var colorStart, ornamentEmmiter, spread;
      spread = Math.max(0, 250 - y * 2.5);
      colorStart = new THREE.Color();
      if (Math.random() < .5) {
        colorStart.setHex(0xff0000);
      } else {
        colorStart.setHex(0xff00ff);
      }
      return ornamentEmmiter = new ShaderParticleEmitter({
        size: 200,
        sizeEnd: 0,
        colorStart: new THREE.Color('white'),
        colorEnd: colorStart,
        position: new THREE.Vector3(this.position.x, y * 4, this.position.z),
        positionSpread: new THREE.Vector3(spread + 10, 10, spread + 10),
        particlesPerSecond: 1,
        opacityStart: 0.5,
        opacityMiddle: 1.0,
        opacityEnd: 1.0
      });
    };

    return Tree;

  })();

}).call(this);
