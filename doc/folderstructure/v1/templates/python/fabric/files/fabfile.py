import sys

from fabric.api import *
from fabric.contrib import *

from defaults import fab

import setup, {%= name %}, deploy

@task(default=True)
def list():
  fab.list_tasks()

@task
def dev():
  fab.read_yaml_config('dev')

@task
def prod(execute = ''):
  if execute != 'real':
    print 'You must write prod:real to actually execute this task'
    sys.exit(1)
  else:
    fab.read_yaml_config('prod')

