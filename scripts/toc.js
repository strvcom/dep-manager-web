/**
 * Generates a Table of Contents on the README.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { sync: glob } = require('glob')

const cwd = process.cwd()

const docsDir = path.relative(cwd, './docs')
const readmePath = path.resolve(cwd, './README.md')
const scriptPath = path.resolve(__dirname, './gh-md-toc')

const readme = fs.readFileSync(readmePath, 'utf8')
const mds = glob(docsDir + '/**/*.md')

try {
  const toc = execSync(`${scriptPath} ${mds.join(' ')}`)
    .toString()
    .replace(/   /g, '  ')
    .replace(/Created by (.*)\n/, '')
    .replace(/\n  /g, '\n')
    .replace(/\* /g, '- ')

  const result = readme.replace(
    /(<!--toc-start-->)(.|\n)*(<!--toc-end-->)/,
    `$1\n${toc}\n$3`
  )

  fs.writeFileSync(readmePath, result, 'utf8')
} catch (err) {
  console.error(err)

  if (err.stdout) console.error(err.stdout.toString())
  if (err.stderr) console.error(err.stderr.toString())
}
