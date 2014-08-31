function getInceptionYear() {
  return new Date().getFullYear();
}

function getGroupId(type) {
  var groupId = '';
  switch (type) {
    case 'lib':
      groupId = 'org.lib';
      break;
    default:
      groupId = 'org.app';
  }
  return groupId;
}

exports.getInceptionYear = getInceptionYear;
exports.getGroupId = getGroupId;
