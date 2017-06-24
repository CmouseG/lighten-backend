const ModuleLoader = require('../lighten/module-loader');
const AppModule = require('../lighten/common/app-module');

class TestModule1 extends AppModule {
    dependsOn() {
        return ['test-module-2', 'test-module-3'];
    }
}

class TestModule2 extends AppModule {

    constructor(app) {
        super(app);
        console.log();
    }

    dependsOn() {
        return ['test-module-3'];
    }
}

class TestModule3 extends AppModule {
}

describe('The Module Loader', () => {

    let moduleLoader;

    beforeEach(() => {
        moduleLoader = new ModuleLoader({
            lightenModules: [
                'test-module-1',
                'test-module-2',
                'test-module-3'
            ]
        }, console.log);
        const oldRequire = require.main.require;
        spyOn(require.main, 'require').and.callFake(name => {
            switch (name) {
                case 'test-module-1': return TestModule1;
                case 'test-module-2': return TestModule2;
                case 'test-module-3': return TestModule3;
                default: return oldRequire(name);
            }
        });
        moduleLoader.initialize();
    });

    it('should correctly validate the packages provided', () => {
        spyOn(moduleLoader, 'validateDependencies').and.callThrough();
        moduleLoader.validate();
        expect(moduleLoader.validateDependencies).toHaveBeenCalledTimes(3);
    });

    it('should correctly sort modules when given 3 appropriate modules', () => {
        expect(moduleLoader.sortModules()).toEqual(['test-module-3', 'test-module-2', 'test-module-1']);
    });

});