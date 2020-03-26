const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { prompt } = require('inquirer')
const ora = require('ora') // 加载中效果
const spinner = ora('mp init...')
const download = require('download-git-repo') // 从github下载
const options = process.argv

const questions = [
  {
    type: 'confirm',
    name: 'init',
    message: 'project is already existed, are you sure to overwrite?',
    default: 'y',
    validate: (input) => {
      if (input.lowerCase !== 'y' && input.lowerCase !== 'n') {
        return 'Please entry y/n !'
      } else {
        return true
      }
    }
  },
]

function downloadMpProject() {
  // dir 为git 仓库地址，或者本地项目路径
  let from = 'freezerup/mp-init'
  let pwd = process.cwd()
  const dir = options[3]
  if (dir) {
    if (dir.indexOf('Git') > -1) {
      from = dir
    } else {
      pwd = `${pwd}/${dir}`
    }
  }
  spinner.start()
  return new Promise((resolve, reject) => {
    download(from, pwd, err => {
      if (err) {
        reject(err)
      }
      spinner.stop()
      resolve(`New project has been initialized successfully! Locate in \n${pwd}`)
    })
  }).catch(err => {
    throw new Error(err)
  })
}

module.exports = function() {
  if (fs.existsSync(path.resolve('/src/project.config.json'))) {
    // 询问式配置
    prompt(questions.slice(0, 1)).then(answers => {
      if (answers[init] === 'y') {
        downloadMpProject()
      } else {
        process.exit(0)
      }
    }).catch(err => {
      console.log(chalk.red(err))
    })
  } else {
    downloadMpProject()
  }
}