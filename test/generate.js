const fse = require('fs-extra')
const path = require('path')
const scripts = require('./ok__quick_compile__.json')

scripts.forEach(s => {
    if (s.path.includes('node_modules')) {
        return;
    }

    let dst = path.join(__dirname, '../assets', s.path);
    fse.ensureDirSync(path.dirname(dst))

    let content = ''
    for (let r in s.deps) {
        if (!r.startsWith('.')) {
            continue;
        }
        content += `import '${r}'\n`
    }

    fse.writeFileSync(dst.replace('.js', '.ts'), content);
})
