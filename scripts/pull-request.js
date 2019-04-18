const { execSync } = require('child_process')
const chalk = require('chalk')
const { prompt } = require('enquirer')

const invariant = (bool, message) =>
  !bool && (console.error(message), process.exit(1))

try {
  execSync('hub --version')
} catch (err) {
  invariant(
    false,
    'No GitHub cli available. You can install it from https://github.com/github/hub'
  )
}

const getIssueNumber = branch => {
  const match = branch.match(/issue\/([0-9]+)/)
  return match && match[1]
}

const current = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()

const coerceBranch = branch => {
  try {
    execSync(`git rev-parse --verify ${branch}`)
  } catch (err) {
    throw new Error(`An invalid branch was provided (${branch})`)
  }

  return branch
}

const { argv } = require('yargs')
  .option('base', {
    alias: 'b',
    type: 'string',
    describe: 'base branch against which to open the pull-request',
    default: 'master',
    coerce: coerceBranch
  })
  .option('head', {
    alias: 'h',
    type: 'string',
    describe: 'head branch from which to open the pull-request',
    default: current,
    coerce: coerceBranch
  })
  .option('remote', {
    alias: 'r',
    type: 'string',
    default: 'origin',
    describe: 'remote origin against which to open the pull-request'
  })
  .option('issue', {
    alias: 'i',
    type: 'number',
    describe:
      'issue number. Defaults to extraction from branch name ("issue/[value]")',
    default: current,
    coerce: issue => {
      const value = !Number(issue) ? getIssueNumber(issue) : issue

      if (!value) {
        throw new Error(`An invalid issue number was provided (${issue})`)
      }

      return value
    }
  })

const { base, head, remote, issue } = argv

const b = text => chalk.white.bold(text)

console.log(
  `\nTransform ${b(`issue #${issue}`)}\n  ...into a ${b(
    'pull-request'
  )}\n  ...from ${b(head)}\n  ...into ${b(base)}\n  ...at ${b(
    remote
  )}?\n\n${chalk.gray(
    "This means the issue will be converted into a pull-request in an operation which can't be reverted.\n"
  )}`
)

prompt({ type: 'confirm', name: 'confirmed', message: `Confirm` })
  .then(({ confirmed }) => {
    if (confirmed) {
      const branches = execSync('git branch -a').toString()

      invariant(
        branches.match(`remotes/${remote}/${base}`),
        `\nCould not find branch ${b(base)} on ${remote}.\n${b(
          "Are you sure you've pushed it?\n"
        )}`
      )

      invariant(
        branches.match(`remotes/${remote}/${head}`),
        `\nCould not find branch ${b(head)} on ${remote}.\n${b(
          "Are you sure you've pushed it?\n"
        )}`
      )

      execSync(`hub pull-request -i ${issue} -b ${base} -h ${head}`).toString()
    }
  })
  .catch(err => {})
