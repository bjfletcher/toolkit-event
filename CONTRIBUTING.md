# Contributing

Like most open source projects, we ask that you fork the project and issue a [pull request](#pull-requests) with your changes.

We encourage small change pull requests, the smaller the change the quicker and easier it is merged.

## Dependencies

To build the toolkit locally, you'll need to install:
 * [ruby](https://www.ruby-lang.org/) (version 1.9.3 or later),
 * [node.js](http://nodejs.org),
 * [Gulp](http://gulpjs.com),
 * [Bundler](http://bundler.io)
 * [Jekyll](http://jekyllrb.com/)


## Workflow

1. Fork the project
2. Clone down your fork
`git clone git://github.com/<username>/jekyll.git`
3. Setup your 'upstream'
`git remote add upstream https://github.com/skyglobal/web-toolkit.git`
4. Create a topic branch to contain your change
`git checkout -b feature-my-feature`
5. Write tests, write your code!
6. Make sure [HISTORY.md](./HISTORY.md) includes a summary of your changes in a new version number heading
5. Make sure you are still up to date with master
`git pull upstream master`
6. If necessary, rebase your commits into logical chunks, without errors.
7. Push the branch up 
`git push origin my_awesome_feature`
8. Create a pull request and describe what your change does and the why you think it should be merged.

If you would like the feature to go live sooner, mention this in the comments/commit. We will provide a temporary live url that will allow you to carry on without getting blocked.

## Running Locally
 * `gulp serve` :  Run Jekyll
 * `gulp deploy` : Push changes to gh-pages