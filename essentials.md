
# Essentials

## Team goals

For each of the ideas explored in the [Starmap](https://material-motion.gitbooks.io/material-motion-starmap/content/):

- Elevate existing solutions so that we can avoid re-inventing wheels.
- In the absence of existing solutions, build great ones.
- Add more ideas to the Starmap as drafts, flesh them out, and then encourage their development across platforms.
- List solutions in the Starmap's [Community](https://material-motion.gitbooks.io/material-motion-starmap/content/community/) chapter.

For ourselves as a team:

- Operate in the open.

## Experimental work

Each platform and language has an `experiments` GitHub repo. We use these repos to house code that isn't ready for production use. This means that APIs are subject to change at **any point in time** without warning.

    git clone git@github.com:material-motion/material-motion-experiments-<yourproject>.git
    cd material-motion-experiments-<yourproject>
    
    mkdir -p material-motion-experiments-/<some name>

You can now begin working within your new experimental folder.

We recommend creating a README.md in your experimental folder outlining the scope of the experiment.

## GitBook etiquette

GitBook does not have pull requests. By default, changes are made to the `master` branch for the book.

### Making minor edits

If you intend to make minor edits, feel free to do so on the master branch. Use good judgment.

### Making major edits

Create a branch for major edits. You can create a branch by following these steps:

- Edit the book of interest.
- Click the "branch" drop-down in the top right of the GitBook web user interface.
- Select "New branch"
- Name the branch.

Once you've created a branch you can freely make changes on it. Your branch is now on its own.

### Handling conflicts

If GitBook detects a conflict when attempting to merge two branches it will open [the conflict resolution](https://www.gitbook.com/blog/features/merge-conflicts) page.

Learn more about GitBook editing by reading:

- [Mirroring GitBooks to GitHub](updating_our_books.md)
- [Creating a GitBook pull request](gitbook_pull_request.md)
