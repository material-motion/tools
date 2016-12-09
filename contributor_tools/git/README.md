## Help

    `mdm git`

    Prints this help page.

## Step 1: Creating a new branch

    `mdm git new <branch_name>`

    Checks out a new branch. This is the start of the git workflow.
    This branch will eventually contain multiple pending commits that each represent a separate
    diff on Phabricator.

## Step 2: Committing onto the branch

    Make a linear series of commits on the branch using regular `git commit`.
    Split commits up so that each commit is a self-contained feature.
    Prune your local commit history with `git commit --amend` or `git rebase -i` as you see fit.

    `mdm git tree`

    Displays the linear series of pending commits.

    `mdm git edit <sha> [<command>]`

    Enters edit mode for the commit with the given <sha>.

    Utilizes interactive rebase mode to automatically put you in an EDIT state.
    The sha you provide should be copied from `mdm git tree` - be aware that the sha changes more
    often than you may expect.

    If given, applies the optional <command> to the commit with the given <sha>.
    For example, "squash" will merge that commit with the preceding one.

    `mdm git continue`

    Exits edit mode previously entered in using `mdm git edit`.

    You should `git commit` your changes before running this command.
    This updates all the following commits with your changes. You may encounter merge conflicts
    which you should resolve.

    This puts you in a clean state so you can continue to export or submit.
