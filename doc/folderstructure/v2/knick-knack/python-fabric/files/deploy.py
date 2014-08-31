import sys

from fabric.api import *
from fabric.contrib import *

from defaults import fab
from config import ssh, sudoers

import {%= name %}

# Tell Fabric which tasks are exported by this file
__all__ = ['deploy_config']

@task(default=True)
def deploy_config():
  print 'start here'
