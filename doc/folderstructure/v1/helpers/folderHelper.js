var join = require('path').join,
    fs   = require('fs');

function createEmptyPackageFolders(props, language, grunt, init) {
  var suffix = getPackageSuffix(props, language);

  createFolder('src/main' + suffix, grunt, init);
  createFolder('src/test' + suffix, grunt, init);
}

function createFolder(folderName, grunt, init) {
  grunt.file.mkdir(join(init.destpath(), folderName));
}

/** Example: /java/org/myservice/droptest */
function getPackageSuffix(props, language) {
  return '/' + language + '/org/' + props.package + '/' + props.name;
}

/** Create XP style empty config folders */
function createConfigFolders(grunt, init) {
  grunt.file.mkdir(join(init.destpath(), 'src/main/etc/default'));
  grunt.file.mkdir(join(init.destpath(), 'src/main/etc/dev'));
  grunt.file.mkdir(join(init.destpath(), 'src/main/etc/stage'));
  grunt.file.mkdir(join(init.destpath(), 'src/main/etc/prod'));
}

/**
 * Rename a single folder
 *
 * @param string path     base path for srcName and destName
 * @param string srcName  old folder name
 * @param string destName new folder name
 * @param string init     grunt-init object
 */
function renameFolder(path, srcName, destName, init) {
  var srcPath  = join(init.destpath(), path + srcName),
      destPath = join(init.destpath(), path + destName);
  fs.renameSync(srcPath, destPath);
}

/**
 * Rename src/main and src/test folders to chosen package and project name.
 *
 * @param string language eg. java
 * @param props  grunt-init input params
 * @param init   grunt-init object
 */
function renameProjectFolders(language, props, init) {
  var path = 'src/main/' + language + '/org/mypackage/';
  renameFolder(path, 'myproject', props.name, init);

  path = 'src/main/' + language + '/org/';
  renameFolder(path, 'mypackage', props.package, init);

  var path = 'src/test/' + language + '/org/mypackage/';
  renameFolder(path, 'myproject', props.name, init);

  path = 'src/test/' + language + '/org/';
  renameFolder(path, 'mypackage', props.package, init);
}

exports.createEmptyPackageFolders = createEmptyPackageFolders;
exports.createConfigFolders       = createConfigFolders;
exports.createFolder              = createFolder;
exports.getPackageSuffix          = getPackageSuffix;
exports.renameFolder              = renameFolder;
exports.renameProjectFolders      = renameProjectFolders;
