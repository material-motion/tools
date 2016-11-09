# Material Motion Tools

Welcome to the Material Motion's tools documentation.

## Installation

Our team uses a custom tool called `mdm` to manage our team's tooling. We encourage adding this tool to your PATH so that you can access it from anywhere on your computer:

    git clone --recursive git@github.com:material-motion/tools.git
    cd tools
    echo "export PATH=$(dirname $(find $(pwd) -regex '.*bin/mdm')):\$PATH"

Add the output path to whichever file your shell uses to configure environment variables. This is often `~/.bash_profile` or `~/.bashrc`.

    # edit ~/.bash_profile
    source ~/.bash_profile

You can now run the `mdm` tool installer like so:

    mdm tools

Or the automated variant:

    mdm tools install

Learn more about each `mdm` command by running `mdm help` or by [reading the docs on GitHub](https://github.com/material-motion/tools/tree/develop/contributor_tools).

## License

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
