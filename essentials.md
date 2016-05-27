
# Essentials

## Communication

We hang out on Discord. The channel is presently private.

All of our work lives in the [material-motion](https://github.com/material-motion) organization on GitHub.

## Team goals

For each of the ideas explored in the [Starmap](https://material-motion.gitbooks.io/material-motion-starmap/content/):

- Elevate existing solutions so that we can avoid re-inventing wheels.
- In the absence of existing solutions, build great ones.
- List solutions in the Starmap's [Community](https://material-motion.gitbooks.io/material-motion-starmap/content/community/) chapter.

For ourselves as a team:

- Operate in the open.

## Tools we use

- [GitBook](https://www.gitbook.com/) for document authoring (like this one!)
- GitHub for code authoring ([material-motion](https://github.com/material-motion) is our org)
- git for all version tracking.
- The [GitBook mac editor](https://www.gitbook.com/editor/osx) allows you to edit books offline.
- [draw.io](https://www.draw.io) for SVG and flow-chart editing.

### GitHub

- [Add SSH keys to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
- [Hello world](https://guides.github.com/activities/hello-world/) GitHub guide.

### Android

Versions of software we use:

- Android Studio 2.1

### Objective-C/Swift

Versions of software we use:

- Xcode 7.3.
- Swift 2.2.

## Experimental work


Each platform and language has an `experiments` GitHub repo. We use these repos to house code that isn't ready for production use.

    git clone git@github.com:material-motion/material-motion-experiments-<yourproject>.git
    cd material-motion-experiments-<yourproject>
    
    mkdir -p material-motion-experiments-/<some name>

You can now begin working within your new experimental folder.

We recommend creating a README.md in your experimental folder outlining the scope of the experiment.



## Getting started

New to the material-motion team? Start by browsing the [Roadmaps](roadmaps/) to learn more about what the team is up to.

## GitBook etiquette

GitBook does not have pull requests. By default, changes are made to the `master` branch for the book.

### Releasing

We will periodically publish "releases" of our books. We are ok with the `master` branch being in a perpetual state of drafting.

### Making minor edits

If you intend to make minor edits, feel free to do so on the master branch. Use good judgment.

### Making major edits

Create a branch for major edits. You can create a branch by following these steps:

- Edit the book of interest.
- Click the "branch" drop-down in the top right of the GitBook web user interface.
- Select "New branch"
- Name the branch.

Once you've created a branch you can freely make changes on it. Your branch is now on its own.

#### Pulling in the latest changes

Changes may land in master while you're working on your branch. To update your branch with these latest changes you can merge `master` into your branch.

To do so, select the "branch" dropdown menu and select "Merge branches". Merge **from** master **to** your branch. Your branch will now include the latest changes from master.

#### Pushing your changes to the master branch

To do so, select the "branch" dropdown menu and select "Merge branches". Merge **from** your branch **to** master. The master branch will now include all of your changes.

### Handling conflicts

If GitBook detects a conflict when attempting to merge two branches it will open [the conflict resolution](https://www.gitbook.com/blog/features/merge-conflicts) page.