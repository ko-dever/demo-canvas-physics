#!/bin/sh

# See folder <project_folder>/.git/hooks/
# for samples files and code examples

# Check if current branch (the branch that will be pushed) === master
# If so, deploy source files online

while read local_ref local_sha remote_ref remote_sha
do
	if [ "$remote_ref" = "refs/heads/master" ]; then

		echo '------------------------------'
		echo ''
		echo 'CUSTOM HOOK "PRE-PUSH" TRIGGERED'
		echo ''
		echo '-------------------------------'

		# The command seems to be executed from the root of the project
		# Where I use in general all my git commands
		npm run deploy

	fi
done

exit 0
