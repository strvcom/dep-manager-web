/**
 * Executes the provided command within a wrapped git stashed tree.
 *
 * @caution The executing command should not alter the tree.
 */

const { execSync } = require('child_process')
const chalk = require('chalk')
const [, , ...commands] = process.argv

const log = text => console.log(chalk.bold('[stashed]: ') + chalk.gray(text))

log('saving uncommitted changes to stash')

const result = execSync('git stash').toString()
const stashed = !/No local changes to save/u.test(result)

for (const command of commands) {
  try {
    log(command)
    execSync(command, { stdio: 'inherit' })
  } catch (err) {
    log(
      `there were errors running "${command}" against a clean working directory`
    )
    process.exitCode = 1
    break
  }
}

log('recovering uncommitted changes from stash')
if (stashed) execSync('git stash apply')
