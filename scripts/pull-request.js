const { spawn } = require('child_process')
const { prompt: inquire } = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

const {
  equals,
  prop,
  pipe,
  map,
  match,
  nth,
  filter,
  find: rFind,
  values,
  uniq,
} = require('ramda')

const git = require('simple-git/promise')()

/*
 * Helpers
 */

const sleep = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

const loader = async (promise, text, min = 500) => {
  console.log('')
  const loading = Promise.all([promise, sleep(min)])
  ora.promise(loading, text)
  await loading
  console.log('')
  return promise
}

const b = text => chalk.white.bold(text)

const parseBranch = match(/remotes\/([^/]*)\/(.*)/u)

const getRemotes = pipe(
  map(parseBranch),
  map(nth(1)),
  filter(Boolean),
  uniq
)

const getRemoteBranches = remote =>
  pipe(
    map(parseBranch),
    // prettier-ignore
    filter(pipe(nth(1), equals(remote))),
    map(nth(2)),
    uniq
  )

const getCurrentBranch = pipe(
  values,
  rFind(prop('current')),
  prop('name')
)

const getIssueNumber = pipe(
  match(/issue\/([0-9]+)/u),
  nth(1)
)

const run = async () => {
  const branches = await loader(git.branch(), 'Loading branches')
  const current = getCurrentBranch(branches.branches)

  const prompts = [
    {
      type: 'list',
      name: 'remote',
      message: 'Remote repository:',
      choices: getRemotes(branches.all),
    },
    {
      type: 'list',
      name: 'base',
      message: 'Target base branch:',
      default: 'master',
      choices: ({ remote }) => getRemoteBranches(remote)(branches.all),
    },
    {
      type: 'list',
      name: 'head',
      message: 'Head branch:',
      default: current,
      choices: ({ remote }) => getRemoteBranches(remote)(branches.all),
    },
    {
      type: 'input',
      name: 'issue',
      message: 'Target issue (empty for none)',
      default: ({ head }) => getIssueNumber(head),
      validate: issue =>
        issue && !Number(issue) ? 'Issue must be a number (or empty)' : true,
    },
  ]

  const { issue, head, base, remote } = await inquire(prompts)

  await loader(sleep(), 'Processing input')

  const args = ['pull-request', '-b', base, '-h', head]

  if (issue) {
    args.push('-i', issue)

    console.log(
      `Transform ${b(`issue #${issue}`)}\n  ...into a ${b(
        'pull-request'
      )}\n  ...from ${b(head)}\n  ...into ${b(base)}\n  ...at ${b(
        remote
      )}?\n\n${chalk.gray(
        "This means the issue will be converted into a pull-request in an operation which can't be reverted.\n"
      )}`
    )

    const { confirmed } = await inquire({
      type: 'confirm',
      name: 'confirmed',
      message: 'Confirm',
      default: false,
    })

    if (!confirmed) process.exit()
  }

  spawn('hub', args, { stdio: 'inherit' })
}

// start script
run()
