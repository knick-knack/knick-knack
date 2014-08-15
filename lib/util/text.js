'use strict';

/**
 * @param [absPath] string An absolute path (eg. /tmp/example/myFolder)
 * @return          string The last part of the path (eg. myFolder)
 */
function getMostNestedFolder(absPath) {
  if(absPath.lastIndexOf('/') === -1) {
    if(absPath.lastIndexOf('\\') === -1) {
      return absPath;
    } else {
      return absPath.slice(absPath.lastIndexOf('\\') + 1, absPath.length);
    }
  } else {
    return absPath.slice(absPath.lastIndexOf('/') + 1, absPath.length);
  }
  return '';
}

exports.getMostNestedFolder = getMostNestedFolder;