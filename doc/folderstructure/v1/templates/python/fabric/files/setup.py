import sys

from fabric.api import *
from fabric.contrib import *
from fabric.contrib.project import rsync_project

from defaults import fab
from config import ssh, sudoers

import {%= name %}

@task
def prepare_vm():
  sudoers.setup_sudoers_on_vm()
  _set_proxy_env_variables()

@task(default=True)
def system():
  print 'start here'

