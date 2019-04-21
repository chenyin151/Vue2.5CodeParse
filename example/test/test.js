let builds = [
        { 
            input: '/Applications/workspace/Vue2.5CodeParse/vue-dev/src/platforms/web/entry-runtime.js',
            external: undefined,
            plugins: [ [Object], [Object], [Object], [Object] ],
            output: { 
                file: '/Applications/workspace/Vue2.5CodeParse/vue-dev/dist/vue.runtime.common.dev.js',
                format: 'cjs',
                banner: '/*!\n * Vue.js v2.6.10\n * (c) 2014-2019 Evan You\n * Released under the MIT License.\n */',
                name: 'Vue' 
            }
        },
        { 
            input: '/Applications/workspace/Vue2.5CodeParse/vue-dev/src/platforms/web/entry-runtime.js',
            external: undefined,
            plugins: [ [Object], [Object], [Object], [Object] ],
            output: 
            { 
                file: '/Applications/workspace/Vue2.5CodeParse/vue-dev/dist/vue.runtime.common.prod.js',
                format: 'cjs',
                banner: '/*!\n * Vue.js v2.6.10\n * (c) 2014-2019 Evan You\n * Released under the MIT License.\n */',
                name: 'Vue' 
            }
        },
        { 
            input: '/Applications/workspace/Vue2.5CodeParse/vue-dev/src/platforms/web/entry-runtime-with-compiler.js',
            external: undefined,
            plugins: [ [Object], [Object], [Object], [Object] ],
            output: 
            { file: '/Applications/workspace/Vue2.5CodeParse/vue-dev/dist/vue.common.dev.js',
            format: 'cjs',
            banner: '/*!\n * Vue.js v2.6.10\n * (c) 2014-2019 Evan You\n * Released under the MIT License.\n */',
            name: 'Vue' }
            }
        ]

        let process_argv = [ '/usr/local/bin/node',
        '/Applications/workspace/Vue2.5CodeParse/vue-dev/scripts/build.js',
        'web-runtime-cjs,web-server-renderer' ];
        let filters = process_argv[2].split(',');
        console.log('----builds', process_argv[2])
        builds = builds.filter(b => {
            
            // filters.some(f => b.output.file.indexOf(f) > -1);
            console.log(b._name)
        })