## Help

    `mdm git`

    Prints this help page.

## Step 1: Creating a new branch

    `mdm git new [branch_name]`

    Checks out a new branch. This is the start of the git workflow.
    This branch will contain multiple pending commits that each represent a separate diff on
    Phabricator.

## Step 2: Committing onto the branch

    Make a linear series of commits on the branch using regular `git commit`.
    Split commits up so that each commit is a self-contained feature.
    Prune your local commit history with `git commit --amend` or `git rebase -i` as you see fit.

    `mdm git tree`

    Displays the linear series of pending commits.
