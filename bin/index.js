#!/usr/bin/env node
const program = require('commander')
const mpInit = require('../commands/mpInit/index.js')

program
  .version('1.0.0', '-v, --version')
  .command('init:mp')
  .alias('mp')
  .description('初始化小程序项目:包含埋点/eventbus/错误上报')
  .action(mpInit)

program.parse(process.argv)