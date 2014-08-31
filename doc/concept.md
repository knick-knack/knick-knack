Concept
===========

After successfully using grunt-init for some time at work we felt that it had some shortcomings like missing support for including other templates. We also found that the command line interface could be improved in some ways, like creating the project folder for the user and having support for tab completion. A quick look at Yeoman didn't satisfy us either, the tool's functionality and their large code base just flattered us. We thought we can make better...

### Project Goals
* focus on user centric design
* keep things as easy as possible for beginners and provide more advanced users with powerful ways to "do more"
* allow reusage of templates in other templates
* don't overwhelm the user with questions during project creation
* don't take away the control from the user, he should always know what happens when he presses "enter"
* it should be possible to generate new projects from a template but also to add files from a template to an existing project
* the user should have to answer the least possible number of questions to generate a project
* work test driven where possible

### Template and Projects
Templates are the main entity in knick-knack. A template is a folder containing the files that get copied to the newly generated project. When we speak of a projects we mean the folder where all the files from a template get generated to.

A template needs to have a config file that allows customizations. When a user wants to scaffold a project we have to check for variables used in the template files. These are placeholders that get replaced with the answers the user gives during the generation process.

A template may have a "process.js" file that allows to program behavior that gets executed before (pre) or after (post) the template has been processed.

### Template folder
All templates reside in a specific folder, that can be passed to knick-knack as a command line argument. When not given it assumes that the templates are located under ~/.knick-knack. The knnick-knack cli command "init" creates this directory when called.

The template folder may contain a file "knick-knack.yml" that contains configuration options that are valid for all templates.

### Partials
Partials are templates that are included in other templates to make it possible to reuse files. For example you can define a partial which contains a readme and include that partial in every template you define. When partials are defined as optional in the config file the user gets asked whether he wants to include them or not (good for things like creation of git projects).

### Generation Process
* see http://www.plantuml.com/plantuml/png/RSv13e9038NX_PpY1JTm1LmOBs28DnYX0nE7bamBnjix6gCBtJLj-kTJyzdWN7icFs1CSl49lN28u_wzD9gNv8q-QnS3wfEV2Io6CMx4XmOs4Rlsg5S4oU1otZlY8OPdVELlPibKDoNUPUb95I4cqbAzJML0tHLGz4cHADYXSS1kpFvUBFsQDGeZP9bH_RDLg8MfV6wKC10jpSlmAlymHEtfS6goF000

### Variable substitution
The files in a template may contain variables for substitution during the generation. It's possible to use variables in file names, too.

* variables are "global", meaning that variables in different templates that have the same name are not distinguished

### Technological Decisions
* we decided to use the [Mustache](http://mustache.github.io/) templating library for parsing the files

### Similar tools
* https://github.com/audreyr/cookiecutter
* http://yeoman.io/
* http://gruntjs.com/project-scaffolding
* [more...](https://github.com/audreyr/cookiecutter#similar-projects)
