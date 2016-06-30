# OS

## Code style: Objective-C

We use clang-format to automatically format our Objective-C code. See the .clang-format file contained at the root of any Objective-C repository for the set of options we use.

## File system structure

We use a file system convention based on [Google's GOS-conventions.](https://github.com/google/GOS-conventions) At this time, all files should be prefixed with 'MDM.'

## Supported tool versions

We use version 2.1.0 of the `psych` gem.

View your version:

    gem list | grep psych

Update your version:

    sudo gem update psych