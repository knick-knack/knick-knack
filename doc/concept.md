Concept
===========

After using grunt-init for some time at work we felt that it had some shortcomings like missing support for including other templates. We also found that the command line interface could be improved in some ways, like creating the project folder for the user and having support for tab completion. A quick look at Yeoman didn't satisfy us either, the tool's functionality and their large code base just flattered us. We thought we can make better...

### Template and Projects
Templates are the main entity in knick-knack. A template is a folder containing the files that get copied to the newly generated project. When we speak of a projects we mean the folder where all the files from a template get generated to. 

A template needs to have a config file that allows customizations bythe user. When a user wants to scaffold a project we have to check for variables used in the template files. These are placeholders that get replaced with the answers the user gives during the generation process. 

### Template folder
All templates reside in a specific folder, that can be passed to knick-knack as a command line argument. When not given it assumes that the templates are located under ~/.knick-knack.  


### Generation Process


### Variable substitution
The files in a template may contain variables for substitution during the generation. It's possible to use variables in file names, too. We decided to use the [Mustache](http://mustache.github.io/) templating library for parsing the files. 
