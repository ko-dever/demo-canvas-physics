Each file in this folder should be a symbolic link for a file in .git/hooks/  
This allow Git to track and version these custom hooks.

Quick reminder, how to make a sym-link :  
`ln -s <path_source_file> <path_target_file>`


# Important

1. First, enter the Git hooks folder :

    `cd <project_folder>/.git/hooks/`


2. Create the sym-link from this location ([see why here](https://stackoverflow.com/questions/4592838/symbolic-link-to-a-hook-in-git)) :

    `ln -s -f <path_my_custom_hook_file> ./<git_hook_file>`

    Note :

    - `<path_my_custom_hook_file>` **must exists** !

    - `<git_hook_file>` does not have to be created manually.  
    But its filename must match one of the Git hook name [listed here](https://git-scm.com/docs/githooks).


3. Make the custom hook file executable :

    `chmod +x <path_my_custom_hook_file>`