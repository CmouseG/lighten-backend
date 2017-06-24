module.exports = class ModuleLoader {

    constructor(pkg, log) {
        this.modules = [];
        this.pkg = pkg;
        this.log = log;
    }

    get lightenModules() {
        return this.pkg.lightenModules;
    }

    initialize() {
        this.modules = this.loadExternalModules();
        this.sortModules()
            .map(moduleKey => this.modules[moduleKey])
            .forEach(module => {
                module.validate();
                module.initialize();
            })
    }

    loadExternalModules() {
        return this.lightenModules
            .map(module => ({[module]: this.loadModule(module)}))
            .reduce((accumulator = {}, value) => Object.assign(accumulator, value))
    }

    loadModule(module) {
        return new (require.main.require(module))(this);
    }

    validate() {
        Object.keys(this.modules)
            .map(moduleKey => this.modules[moduleKey])
            .forEach(module => {
                this.validateDependencies(module)
            });
    }

    sortModules() {
        const moduleKeys = Object.keys(this.modules);
        const sortedModules = moduleKeys.filter(module => this.modules[module].dependsOn().length === 0);
        const unsortedModules = moduleKeys.filter(module => this.modules[module].dependsOn().length !== 0);
        while (sortedModules.length < this.lightenModules.length) {
            const nextUnsortedIndex = unsortedModules
                .findIndex(module => this.modules[module].dependsOn()
                    .every(dependent => sortedModules.includes(dependent)));
            if (nextUnsortedIndex === undefined) {
                throw `Could not load dependencies: ${unsortedModules}, loaded modules: ${sortedModules}`;
            }
            sortedModules.push(unsortedModules[nextUnsortedIndex]);
            unsortedModules.splice(nextUnsortedIndex, 1);
        }
        return sortedModules;
    }


    validateDependencies(module) {
        return module.dependsOn()
            .forEach(dependency => {
                if (!this.lightenModules.includes(dependency)) {
                    throw `${module.constructor.name} depends on ${dependency}, 
                    ensure it is installed and added to the lightenModules in package.json`
                }
            })
    }

};