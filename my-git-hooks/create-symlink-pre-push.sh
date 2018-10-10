#!/bin/sh

# I created this file to easily create sym-link for Git hooks :
#
# If I use a new laptop without the project on it, if I want to clone
# the repo elsewhere on my current laptop, the new `.git/` folder
# won't have any sym-link to my custom hooks in this folder.


# How to use this file :
#
# 1) Enter the folder where this file is located :
# `cd <folder_of_this_file>`
#
# 2) Make this file executable :
# `chmod +x <this_file>`
#
# 3) Execute this file :
# `./<this_file>`


# Path of the custom hook file
PATH_CUSTOM_HOOK='../../my-git-hooks/pre-push.sh'


# Enter git hooks folder
#
# All operations using the custom hook file must be done after having
# accessed this folder because the path is relative to this one.
cd ../.git/hooks/


# Make sure the custom hook file exists
touch $PATH_CUSTOM_HOOK


# Create the symbolic link **from here**
# `./pre-push` => hook in `.git/hooks/` folder
#              => this file does not need to be created manually
ln -s -f $PATH_CUSTOM_HOOK ./pre-push


# Make the custom hook file executable
chmod +x $PATH_CUSTOM_HOOK