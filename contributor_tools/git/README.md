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

    `mdm git edit <ref> [<command>]`

    Enters edit mode for the commit with the given <ref>. See the "Supported ref notations" section.

    Utilizes interactive rebase mode to automatically put you in an EDIT state.

    If given, applies the optional <command> to the commit with the given <ref>.
    For example, "squash" will merge that commit with the preceding one.

    `mdm git continue`

    Exits edit mode previously entered in using `mdm git edit`.

    You should `git commit` your changes before running this command.
    This updates all the following commits with your changes. You may encounter merge conflicts
    which you should resolve.

    This puts you in a clean state so you can continue to export or submit.

    `mdm git abort`

    Aborts edit mode previously entered in using `mdm git edit`.

    This aborts the interactive rebase.
    You will lose all your changes since entering interactive rebase.

    This puts you in a clean state so you can continue to export or submit.

## Step 3: Exporting a commit as a diff for review

    A commit should be exported when it is ready for review, and every time you have made changes
    that you would like the existing Phabricator diff to reflect.

    `mdm git export [<ref>] [<flags>]`

    Creates a Phabricator diff or updates an existing one for the commit that is determined by:

        The [<ref>], if provided. See the "Supported ref notations" section.
        HEAD, otherwise.

    The optional [<flags>] are passed directly to `arc diff`.
    For example, pass "--plan-changes" to set the diff state to "Changes Planned".

## Step 4: Submit a commit

    A commit should only be submitted after it has been exported.

    `mdm git submit [<ref>] [<flags>]`

    Lands the existing Phabricator diff for the commit that is determined by:

        The [<ref>], if provided. See the "Supported ref notations" section.
        BASE, otherwise.

    The optional [<flags>] are passed directly to `arc land`.

## Supported ref notations

    All git ref notations are supported. However, a ref will be rejected if it does not exist in
    the list returned by `mdm git tree`.

    Here are some common ref notations that work particularly well in this workflow:

    SHA: `d921970`, `d921970aadf03b3cf0e71becdaab3147ba71cdef`, ...

        The recommended workflow is to provide a commit's sha directly from `mdm git tree`.
        Be aware that the sha changes when the commit or its ancestors are modified in any way.

    Ancestry: `HEAD`, `HEAD~`, `HEAD~2`, ...

        You can reference a commit at the top of the stack relative to HEAD.
        `HEAD` is the top ref, `HEAD~` or `HEAD~1` is the 2nd from the top, and so on.

    Reversed: `BASE`, `BASE+1`, `BASE+2`, ...

        For your convenience, a BASE notation is also supported to reference commits at the
        bottom of the `mdm git tree` stack. The syntax for BASE closely mirror that of HEAD.
        `BASE` is the bottom ref, `BASE+` or `BASE+1` is the 2nd from the bottom, and so on.
