const { spawn } = require('child_process');
const glob = require('glob');
const fs = require('fs-extra')


const varCase = str => str.replace(/-[a-z]/g, m => m[1].toUpperCase()).replace(/^.{1}/, m => m.toUpperCase());
const lowCase = str => str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');
const basePath = process.cwd() // 获取根目录: /Users/boyang/reactapp
const curPath = __dirname 
const name = process.argv[2] // 获取 'node script/add input' 中的 'input'
const input = lowCase(name)
const Input = varCase(name)

createComponent()
addExport()

async function addExport() {
  const filePath = `${basePath}/src/index.ts`
  const txt = `export { default as ${Input} } from './${Input}';`
  fs.appendFile(filePath, txt)
}

async function createComponent() {
  spawn('mkdir', ['-p', `${basePath}/src/${Input}`])
  const tplFiles = glob.sync(`${curPath}/tpl-component/*`);
  tplFiles.map(async file => {
    const content = await fs.readFile(file, 'utf-8')
    const newPath = file.replace('script/tpl-component', `src/${Input}`)
    .replace('CCC', Input)
    .replace('ccc', input)
    const newContent = content
    .replace(/ccc/g, input)
    .replace(/CCC/g, Input)
    fs.writeFile(newPath, newContent)
  })
}
