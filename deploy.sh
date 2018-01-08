#!/usr/bin/env bash
# The MIT License (MIT)
# Copyright (c) Happystack


# shellcheck disable=SC2034
tasks=()
tasksCommand=()


# Do not change content before here.
#
# How to use
# ----------
# To add a new task, add the task title and the command.
#
# tasks[n]='Task title'
# tasksCommand[n]='the bash command'
#
# where 'n' is the index of the task
#
#
################################################################################
# Your custom content for the display, title and subtitle
################################################################################
currentVersion=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
display="Current Version: ${currentVersion}"
title='Happystack Auth'
subtitle='Deploy'

################################################################################
# Task 1
################################################################################
task1() {
  CI=true npm test
}
tasks[0]='Test suite'
tasksCommand[0]="task1"


###############################################################################
# Task 2
###############################################################################
tasks[1]='Linter'
tasksCommand[1]='npm run lint'


###############################################################################
# Task 3
###############################################################################
tasks[2]='Snyk security audit'
tasksCommand[2]='snyk test'


###############################################################################
# Task 4
###############################################################################
tasks[3]='Run build'
tasksCommand[3]='npm run build'


################################################################################
# Task 5
################################################################################
tasks[4]='Run 200.html'
tasksCommand[4]='cp -rf ./build/index.html ./build/200.html'


################################################################################
# Task 6
################################################################################
tasks[5]='Deploy to Surge'
tasksCommand[5]='surge ./build  auth.happystack.io'
