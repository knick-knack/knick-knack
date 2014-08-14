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

def _set_proxy_env_variables():
  if sudo('grep http_proxy /etc/environment', warn_only=True, quiet=True).failed:
    sudo('echo http_proxy="http://proxy.dlan.cinetic.de:8080/" >> /etc/environment')
    sudo('echo https_proxy="http://proxy.dlan.cinetic.de:8080/" >> /etc/environment')
    sudo('echo ftp_proxy="http://proxy.dlan.cinetic.de:8080/" >> /etc/environment')

@task(default=True)
def system():
  print 'start here'

