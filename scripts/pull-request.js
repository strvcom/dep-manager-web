const { execSync } = require('child_process')

const invariant = (bool, message) =>
  !bool && (console.error(message), process.exit(1))

const getIssueNumber = branch => {
  const match = branch.match(/issue\/([0-9]+)/)
  return match && match[1]
}

try {
  execSync('hub --version')
} catch (err) {
  invariant(
    false,
    'No GitHub cli available. You can install it from https://github.com/github/hub'
  )
}

const branch = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()

invariant(branch, 'Could not determine branch')

const issue = getIssueNumber(branch)

invariant(issue, 'Could not determine target issue')

const base = process.argv[2] || 'master'

const branches = execSync('git branch -a').toString()

invariant(
  branches.match(`remotes/origin/${base}`),
  `Could not find branch ${base} on origin. Are you sure you've pushed it?`
)

invariant(
  branches.match(`remotes/origin/${branch}`),
  `Could not find branch ${branch} on origin. Are you sure you've pushed it?`
)

execSync(`hub pull-request -i ${issue} -b ${base} -h ${branch}`).toString()
